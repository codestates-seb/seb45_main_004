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

    @PostMapping("/{toMemberId}")
    public ResponseEntity postFollow(@PathVariable Long toMemberId) {

        followService.followMember(toMemberId);
        return new ResponseEntity<>("FOLLOW💗", HttpStatus.OK);
    }

    @GetMapping("/follower/{memberId}")
    public ResponseEntity getFollowers(@PathVariable Long memberId) {
        Long followersCount = followService.countFollowers(memberId);
        return new ResponseEntity<>(followersCount, HttpStatus.OK);
    }

    @GetMapping("/following/{memberId}")
    public ResponseEntity getFollowing(@PathVariable Long memberId) {
        Long followingCount = followService.countFollowings(memberId);
        return new ResponseEntity<>(followingCount, HttpStatus.OK);
    }

    @DeleteMapping("/{toMemberId}")
    public ResponseEntity deleteFollow(@PathVariable Long toMemberId) {
        followService.unFollowMember(toMemberId);
        return new ResponseEntity<>("UNFOLLOW💔", HttpStatus.OK);
    }
}
