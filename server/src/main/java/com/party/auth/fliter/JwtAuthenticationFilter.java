package com.party.auth.fliter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.party.auth.dto.LoginDto;
import com.party.auth.event.RefreshSaveEvent;
import com.party.auth.token.JwtTokenizer;
import com.party.member.entity.Member;
import com.party.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter{
    private final JwtTokenizer jwtTokenizer;
    private final AuthenticationManager authenticationManager;
    private final ApplicationEventPublisher applicationEventPublisher;

    private String delegateAccessToken(Member member) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("email", member.getEmail());
        claims.put("nickname", member.getNickname());
        claims.put("roles", member.getRoles());
        claims.put("id", member.getId());

        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, jwtTokenizer.encodedBase64SecretKey(jwtTokenizer.getSecretKey()));

        return accessToken;
    }

    private String delegateRefreshToken(Member member) {
        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodedBase64SecretKey(jwtTokenizer.getSecretKey());

        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);

        return refreshToken;
    }

    @SneakyThrows
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request,
                                                HttpServletResponse response) {
        ObjectMapper objectMapper = new ObjectMapper();

        LoginDto loginDto = objectMapper.readValue(request.getInputStream(), LoginDto.class);

        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(
                        loginDto.getUsername(), loginDto.getPassword());

        return authenticationManager.authenticate(authenticationToken);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {

        Member member = (Member) authResult.getPrincipal();

        String accessToken = delegateAccessToken(member);
        String refreshToken = delegateRefreshToken(member);

//        // 멤버 레코드의 refreshToken만 업데이트 해주는 쿼리를
//        // 사용해서 Member의 refreshToken을 refresh 칼럼에 저장
//        memberRepository.updateRefreshToken(member.getId(), refreshToken);
        System.out.println("여긴 필터단계" + refreshToken);
        applicationEventPublisher.publishEvent(new RefreshSaveEvent(member, refreshToken));

        response.setHeader("Authorization", "Bearer " + accessToken);
        response.setHeader("Refresh", "Bearer " + refreshToken);
        response.setHeader("memberId", String.valueOf(member.getId()));
    }
}
