package com.party.auth.controller;

import com.party.auth.dto.OAuth;
import com.party.auth.dto.Refresh;
import com.party.auth.dto.Token;
import com.party.auth.service.OAuthService;
import com.party.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;

@Controller
@RequestMapping("/oauth")
@RequiredArgsConstructor
public class OAuthController {
    private final OAuthService oAuthService;

    @PostMapping("/login")
    public ResponseEntity<Void> oauth(@RequestBody @Valid OAuth oAuth) {
        Token token = oAuthService.login(oAuth.getProvider(), oAuth.getCode());

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + token.getAccessToken());
        headers.add("Refresh", "Bearer " + token.getRefreshToken());
        headers.add("memberId", String.valueOf(token.getId()));

        return ResponseEntity.ok().headers(headers).build();
    }

    // 리프레쉬 토큰을 받아 검증후 엑세스토큰 리프레쉬토큰을 각각 재발급해줌
    @GetMapping("/refresh")
    public ResponseEntity refreshForAccess(@RequestBody Refresh refreshToken, HttpServletResponse response) throws IOException {
        Token token = oAuthService.verifyRefreshToken(refreshToken.getRefreshToken(), response);
        // 여긴 ATK랑 RTK를 헤더에 담아서 다시 보내줄거임;
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + token.getAccessToken());
        headers.add("Refresh", "Bearer " + token.getRefreshToken());
        headers.add("memberId", String.valueOf(token.getId()));

        return new ResponseEntity(headers, HttpStatus.OK);
    }
}
