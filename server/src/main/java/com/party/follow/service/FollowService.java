package com.party.follow.service;


import com.party.exception.BusinessLogicException;
import com.party.exception.ExceptionCode;
import com.party.follow.entity.Follow;
import com.party.follow.repository.FollowRepository;
import com.party.member.entity.Member;
import com.party.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class FollowService {

    private final FollowRepository followRepository;
    private final MemberRepository memberRepository;

    //팔로우 추가
    public void followMember(Long followerId, Long followingId) {
        // 팔로우를 추가하기 전에 해당 멤버가 존재하는지 확인합니다.
        Member follower = memberRepository.findById(followerId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        Member following = memberRepository.findById(followingId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        // 이미 팔로우 관계가 있는지 확인합니다.
        if (followRepository.findById_FollowerAndId_Following(followerId, followingId) != null) {
            throw new BusinessLogicException(ExceptionCode.ALREADY_FOLLOWING);
        }

        // 새로운 팔로우 엔티티를 생성합니다.
        Follow follow = new Follow(follower.getId(), following.getId());

        // 팔로우를 저장합니다.
        followRepository.save(follow);
    }

}
