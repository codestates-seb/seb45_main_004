package com.party.follow.controller;

import com.party.follow.service.FollowService;
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

    @PostMapping("/{fromMemberId}/{toMemberId}")
    public ResponseEntity postFollow(@PathVariable Long fromMemberId,
                                     @PathVariable Long toMemberId) {

        followService.followMember(fromMemberId,toMemberId);
        return new ResponseEntity<>("팔로우 성공!🎉", HttpStatus.OK);
    }
}
