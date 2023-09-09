package com.party.follow.controller;

import com.party.follow.dto.FollowDto;
import com.party.follow.service.FollowService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/follows")
public class FollowController {

    private final FollowService followService;

    //팔로잉
    @PostMapping("/{toMemberId}")
    public ResponseEntity postFollow(@PathVariable Long toMemberId) {

        followService.followMember(toMemberId);
        return new ResponseEntity<>("FOLLOW💗", HttpStatus.OK);
    }

    //팔로워 수 조회
    @GetMapping("/follower/{memberId}")
    public ResponseEntity getFollowers(@PathVariable Long memberId) {
        Long followersCount = followService.countFollowers(memberId);
        return new ResponseEntity<>(followersCount, HttpStatus.OK);
    }

    //팔로워 목록 조회
    @GetMapping("/followerList/{memberId}")
    public ResponseEntity getFollowerList(@PathVariable Long memberId) {
        List<FollowDto.Member> followers = followService.getFollowings(memberId);
        return new ResponseEntity<>(followers, HttpStatus.OK);
    }

    //팔로잉 수 조회
    @GetMapping("/following/{memberId}")
    public ResponseEntity getFollowing(@PathVariable Long memberId) {
        Long followingCount = followService.countFollowings(memberId);
        return new ResponseEntity<>(followingCount, HttpStatus.OK);
    }

    //팔로잉 목록 조회
    @GetMapping("/followingList/{memberId}")
    public ResponseEntity getFollowingList(@PathVariable Long memberId) {
        List<FollowDto.Member> followings = followService.getFollowers(memberId);
        return new ResponseEntity<>(followings, HttpStatus.OK);
    }

    //언팔로우
    @DeleteMapping("/{toMemberId}")
    public ResponseEntity deleteFollow(@PathVariable Long toMemberId) {
        followService.unFollowMember(toMemberId);
        return new ResponseEntity<>("UNFOLLOW💔", HttpStatus.OK);
    }
}
