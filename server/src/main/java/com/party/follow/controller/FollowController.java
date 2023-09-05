package com.party.follow.controller;

import com.party.follow.service.FollowService;
import com.party.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequiredArgsConstructor
@RequestMapping("/follows")
public class FollowController {

    private final FollowService followService;
    private final MemberRepository memberRepository;

    @PostMapping("/{followerId}/{followingId}")
    public ResponseEntity postFollow(@PathVariable Long followerId,
                                     @PathVariable Long followingId) {

        followService.followMember(followerId, followingId);
        return ResponseEntity.status(HttpStatus.CREATED).body("Followed successfully");
    }
}
