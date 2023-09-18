package com.party.auth.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.party.auth.dto.MemberProfile;
import com.party.auth.dto.Token;
import com.party.auth.event.RefreshSaveEvent;
import com.party.auth.fliter.JwtAuthenticationFilter;
import com.party.auth.provider.OAuthProvider;
import com.party.auth.token.JwtTokenizer;
import com.party.exception.BusinessLogicException;
import com.party.exception.ExceptionCode;
import com.party.image.service.AwsService;
import com.party.member.entity.Member;
import com.party.member.repository.MemberRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.InMemoryClientRegistrationRepository;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AccessToken;
import org.springframework.security.oauth2.core.endpoint.OAuth2AccessTokenResponse;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

import static java.nio.charset.StandardCharsets.UTF_8;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class OAuthService {
    private final InMemoryClientRegistrationRepository inMemoryRepository;
    private final MemberRepository memberRepository;
    private final JwtTokenizer jwtTokenizer;
    private final DefaultOAuth2UserService defaultOAuth2UserService;
    private final RestTemplate restTemplate;
    private final AwsService awsService;
    private final ApplicationEventPublisher applicationEventPublisher;

    @Transactional
    public Token login(OAuthProvider provider, String code) {
        // google, kakao, naver 등 가져옴 어디서 로그인 하는건지
        String registrationId = provider.getDescription();

        // 위에서 설정한 제공업체의 이름으로 해당 이름에 맞는 클라이언트를 찾아옴
        // yml에 등록해놓은걸 기반으로 인메모리에 저장이 되어있다. 그걸기반으로 찾아서 꺼내옴
        ClientRegistration clientRegistration = inMemoryRepository.findByRegistrationId(registrationId);

        // 구글 같은 클라이언트의 리소스에 접속할 토큰을 얻는 것
        String token = getToken(code, clientRegistration);

        OAuth2User oAuth2User = getOAuth2User(token, clientRegistration);

        Map<String, Object> attributes = new HashMap<>(oAuth2User.getAttributes());

        MemberProfile memberProfile = OAuthProvider.extract(registrationId, attributes);

        Member member = getOrSaveMember(memberProfile);

        Token jwtToken = createToken(member);

//        // jwt토큰의 refreshToken을 Member의 refresh 칼럼에 저장
//        memberRepository.updateRefreshToken(member.getId(), jwtToken.getRefreshToken());
        applicationEventPublisher.publishEvent(new RefreshSaveEvent(member, jwtToken.getRefreshToken()));

        return jwtToken;
    }

    public String getToken(String code, ClientRegistration clientRegistration) {
        // 구글의 정보에서 서비스 제공자의 상세정보에서 토큰을 얻을 수 있는 URI를 얻어옴.
        String uri = clientRegistration.getProviderDetails().getTokenUri();

        //요청 인코딩 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.setAcceptCharset(List.of(UTF_8));

        // 구글에 요청할 json 바디를 만들기
        // HttpEntity<>(body, header) 값이 들어갑니다
        HttpEntity<MultiValueMap<String, String>> entity =
                new HttpEntity<>(tokenRequest(code, clientRegistration), headers);

        try {
            ResponseEntity<Map<String, String>> responseEntity = restTemplate.exchange(
                    uri,
                    HttpMethod.POST,
                    entity,
                    new ParameterizedTypeReference<>(){}
            );

            return responseEntity.getBody().get("access_token");
        } catch (HttpClientErrorException.BadRequest e) {
            throw new BusinessLogicException(ExceptionCode.PERMISSION_NOT_EXIST);
        }
    }

    private OAuth2User getOAuth2User(String token, ClientRegistration clientRegistration) {

        // 구글 토큰 재가공 -> Spring Security의 다른 기능과의 호환성 및 코드의 일관성을 위해
        OAuth2AccessTokenResponse tokenResponse = OAuth2AccessTokenResponse.withToken(token)
                .tokenType(OAuth2AccessToken.TokenType.BEARER)
                .expiresIn(3600L)
                .build();

        // 구글 토큰으로 OAuth2User를 얻기 위해 요청을 생성
        OAuth2UserRequest userRequest = new OAuth2UserRequest(clientRegistration, tokenResponse.getAccessToken());

        // loadUser는 주어진 OAuth2UserRequest를 사용해서 사용자 정보 엔드포인트로부터
        // OAuth2User를 얻어옴 내부적으로 OAuth2Request에 포함된 엑세스 토큰과
        // ClientRegistration 정보를 사용해서 OAuth2
        // 서비스 제공자의 사용자 정보 엔드포인트에 요청을 보냄
        // 응답으로 사용자의 상세 정보를 받아와 OAuth2User 객체로 반환한다.
        return defaultOAuth2UserService.loadUser(userRequest);
    }

    private MultiValueMap<String, String> tokenRequest(String code, ClientRegistration provider) {
        MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();

        formData.add("code", code);
        formData.add("grant_type", "authorization_code");
        formData.add("redirect_uri", provider.getRedirectUri());
        formData.add("client_secret", provider.getClientSecret());
        formData.add("client_id", provider.getClientId());
        return formData;
    }

    private Member getOrSaveMember(MemberProfile memberProfile) {
        Member member = getMember(memberProfile);

        if (member == null) {
            member = saveMember(memberProfile);
        }
        return member;
    }

    private Member getMember(MemberProfile memberProfile) {
        return memberRepository.findByEmail(memberProfile.getEmail())
                .orElse(null);
    }

    private Member saveMember(MemberProfile memberProfile) {
        Member member = Member.createMember(
                memberProfile.getEmail(),
                "oauthUser",
                memberProfile.getEmail().split("@")[0],
                memberProfile.getGender()
        );
        String imagePath = awsService.getThumbnailPath("profile/1.png");
        member.setImageUrl(imagePath);
        Member signMember = memberRepository.save(member);
        return signMember;
    }

    private Token createToken(Member member) {
        // CustomUserDetails 객체 생성
        CustomUserDetails userDetails = new CustomUserDetails(
                member.getId(),
                member.getEmail(),
                member.getPassword(),
                Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")
        ));

        // Spring Security authentication 객체 생성
        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                userDetails,
                null,
                userDetails.getAuthorities()
        );

        // Claims 생성
        Map<String, Object> claims = new HashMap<>();
        claims.put("id", userDetails.getId());
        claims.put("authorities", authentication.getAuthorities());
        claims.put("roles", member.getRoles());

        // Access Token 생성
        String accessToken = jwtTokenizer.generateAccessToken(
                claims,
                userDetails.getUsername(),
                jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes()),
                jwtTokenizer.encodedBase64SecretKey(jwtTokenizer.getSecretKey()) // 기본 키 사용
        );
        String refreshToken = jwtTokenizer.generateRefreshToken(
                userDetails.getUsername(),
                jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes()),
                jwtTokenizer.encodedBase64SecretKey(jwtTokenizer.getSecretKey())
        );

        return new Token(accessToken, refreshToken, member.getId());
    }

    // 여기부터는 카카오 로그인이랑 상관없음
    /*
    public void verifyRefreshToken(String refreshToken, HttpServletResponse response) throws IOException {
        // 만료기한과 유효한 리프레쉬 토큰인지 검증과정을 거침
        try {
        겹침 ->     jwtTokenizer.getClaims(refreshToken, jwtTokenizer.encodedBase64SecretKey(jwtTokenizer.getSecretKey()));
        }catch (ExpiredJwtException e) {
            ObjectMapper mapper = new ObjectMapper();
            Map<String, String> responseBody = new HashMap<>();
            responseBody.put("message", "다시 로그인 필요");
            String json = mapper.writeValueAsString(responseBody);

            response.setContentType("application/json;charset=UTF-8");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write(json);
        }
        // 토큰에 포함된 Username(email)을 통해 Member를 찾고
        // 해당 Member의 refresh와 비교
        겹침 -> Claims claims = jwtTokenizer.getClaims(refreshToken, jwtTokenizer.encodedBase64SecretKey(jwtTokenizer.getSecretKey())).getBody();
    }
    작성하다가 겹치는 코드가 있어서 리팩터링
    */
    public Token verifyRefreshToken(String refreshToken, HttpServletResponse response) throws IOException {
        Claims claims = null;

        // 만료기한과 유효한 리프레쉬 토큰인지 검증과정을 거침
        try {
            claims = jwtTokenizer.getClaims(refreshToken, jwtTokenizer.encodedBase64SecretKey(jwtTokenizer.getSecretKey())).getBody();
        } catch (ExpiredJwtException e) {
            ObjectMapper mapper = new ObjectMapper();
            Map<String, String> responseBody = new HashMap<>();
            responseBody.put("message", "다시 로그인 필요");
            String json = mapper.writeValueAsString(responseBody);

            response.setContentType("application/json;charset=UTF-8");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write(json);
            throw new BusinessLogicException(ExceptionCode.PERMISSION_NOT_EXIST);
        }
        System.out.println("서비스 계층에서 보낸 로그입니다" + claims.toString());
        // 유효한 토큰이면 멤버꺼내와서 DB의 토큰과 비교후 맞으면 재생성
        if (claims != null) { // 여기서 claims가 null이 나오는거 같음
            Optional<Member> findmember = memberRepository.findByEmail(claims.getSubject());
            System.out.println(memberRepository.findRefreshTokenById(findmember.get().getId()));
            System.out.println(refreshToken);
            System.out.println(memberRepository.findRefreshTokenById(findmember.get().getId()).get().equals(refreshToken));
            if (findmember.isPresent() & memberRepository.findRefreshTokenById(findmember.get().getId()).get().equals(refreshToken)) {
                System.out.println("DB의 리프레쉬 토큰과는 인증이 성공");
                Token token = createToken(findmember.get());
                applicationEventPublisher.publishEvent(new RefreshSaveEvent(findmember.get(), token.getRefreshToken()));
                return token;
            }
        }
        throw new BusinessLogicException(ExceptionCode.REFRESHTOKEN_IS_NOT_VERIFIED);
    }


}
