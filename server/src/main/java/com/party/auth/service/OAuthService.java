package com.party.auth.service;

import com.party.auth.dto.MemberProfile;
import com.party.auth.dto.Token;
import com.party.auth.fliter.JwtAuthenticationFilter;
import com.party.auth.provider.OAuthProvider;
import com.party.auth.token.JwtTokenizer;
import com.party.exception.BusinessLogicException;
import com.party.exception.ExceptionCode;
import com.party.member.entity.Member;
import com.party.member.repository.MemberRepository;
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

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static java.nio.charset.StandardCharsets.UTF_8;

@Service
@Transactional
public class OAuthService {
    private final InMemoryClientRegistrationRepository inMemoryRepository;
    private final MemberRepository memberRepository;
    private final JwtTokenizer jwtTokenizer;
    private final DefaultOAuth2UserService defaultOAuth2UserService;
    private final RestTemplate restTemplate;

    public OAuthService(InMemoryClientRegistrationRepository inMemoryRepository, MemberRepository memberRepository,
                        JwtTokenizer jwtTokenizer, DefaultOAuth2UserService defaultOAuth2UserService, RestTemplate restTemplate) {
        this.inMemoryRepository = inMemoryRepository;
        this.memberRepository = memberRepository;
        this.jwtTokenizer = jwtTokenizer;
        this.defaultOAuth2UserService = defaultOAuth2UserService;
        this.restTemplate = restTemplate;
    }

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

        return createToken(member);

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
                memberProfile.getEmail().split("@")[0]
        );
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
}
