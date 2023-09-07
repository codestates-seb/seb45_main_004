package com.party.follow.controller;

import com.party.follow.service.FollowService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor
@RequestMapping("/follows")
public class FollowController {

    private final FollowService followService;

    @PostMapping("/{fromMemberId}/{toMemberId}")
    public ResponseEntity postFollow(@PathVariable Long fromMemberId,
                                     @PathVariable Long toMemberId) {

        followService.followMember(fromMemberId,toMemberId);
        return new ResponseEntity<>("FOLLOW💗", HttpStatus.OK);
    }

    @DeleteMapping("/{fromMemberId}/{toMemberId}")
    public ResponseEntity deleteFollow(@PathVariable Long fromMemberId,
                                       @PathVariable Long toMemberId) {
        followService.unfollowMember(fromMemberId, toMemberId);
        return new ResponseEntity<>("UNFOLLOW💔",HttpStatus.OK);
    }
}
