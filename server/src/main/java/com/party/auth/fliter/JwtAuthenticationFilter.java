package com.party.auth.fliter;

import com.party.auth.token.JwtTokenizer;
import com.party.member.entity.Member;
import lombok.RequiredArgsConstructor;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor

public class JwtAuthenticationFilter {
    private final JwtTokenizer jwtTokenizer;

    private String delegateAccessToken(Member member) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("memberEmail", member.getMemberEmail());
        claims.put("memberNickname", member.getMemberNickname());
        claims.put("roles", member.getRoles());
        claims.put("memberId", member.getMemberId());

        String subject = member.getMemberEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, jwtTokenizer.encodedBase64SecretKey());

        return accessToken;
    }

    private String delegateRefreshToken(Member member) {
        String subject = member.getMemberEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodedBase64SecretKey(jwtTokenizer.getSecretKey());

        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);

        return refreshToken;
    }
}
