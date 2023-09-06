package com.party.follow.service;


import com.party.exception.BusinessLogicException;
import com.party.exception.ExceptionCode;
import com.party.follow.entity.Follow;
import com.party.follow.repository.FollowRepository;
import com.party.member.entity.Member;
import com.party.member.repository.MemberRepository;
import com.party.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;


@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class FollowService {

    private final FollowRepository followRepository;
    private final MemberRepository memberRepository;
    private final MemberService memberService;

    //팔로우 추가
    public void followMember(Long fromMemberId,Long toMemberId) {
        //현재 로그인한 사용자 ID 가져오기
        Long loggedInMemberId = extractMemberId();

        //멤버 유효성 검사 및 존재 여부 확인
        validateMemberIds(fromMemberId, toMemberId, loggedInMemberId);

        //자기 자신을 팔로우 하지 못함
        if (fromMemberId.equals(toMemberId)) {
            throw new BusinessLogicException(ExceptionCode.OWN_MEMBER);
        }

        //이미 팔로우 관계가 있는지 확인
        if (followExists(fromMemberId, toMemberId)) {
            throw new BusinessLogicException(ExceptionCode.ALREADY_FOLLOWING);
        }

        //팔로우 관계 생성
        Follow follow = new Follow(fromMemberId, toMemberId);
        followRepository.save(follow);
    }

    //팔로우 취소
    public void unfollowMember(Long fromMemberId, Long toMemberId) {
        //현재 로그인한 사용자 ID 가져오기
        Long loggedInMemberId = extractMemberId();

        //멤버 유효성 검사 및 존재 여부 확인
        validateMemberIds(fromMemberId, toMemberId, loggedInMemberId);

        //팔로우 관계가 있는지 확인 후 삭제
        if (followExists(fromMemberId, toMemberId)) {
            removeFollow(fromMemberId, toMemberId);
        } else {
            throw new BusinessLogicException(ExceptionCode.FOLLOW_NOT_FOUND);
        }
    }

    //멤버 ID 유효성 검사 및 존재 여부 확인
    private void validateMemberIds(Long fromMemberId, Long toMemberId, Long loggedInMemberId) {
        if (!fromMemberId.equals(loggedInMemberId)) {
            throw new BusinessLogicException(ExceptionCode.UNAUTHORIZED_FOLLOW);
        }
        Optional<Member> fromMemberOptional = memberRepository.findById(fromMemberId);
        Optional<Member> toMemberOptional = memberRepository.findById(toMemberId);

        fromMemberOptional.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        toMemberOptional.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    //팔로우 관계 여부 확인
    private boolean followExists(Long fromMemberId, Long toMemberId) {
        Follow existingFollow1 = followRepository.findById_ToMemberAndId_FromMember(toMemberId, fromMemberId);
        Follow existingFollow2 = followRepository.findById_FromMemberAndId_ToMember(fromMemberId, toMemberId);
        return existingFollow1 != null || existingFollow2 != null;
    }

    //팔로우 관계 삭제
    private void removeFollow(Long fromMemberId, Long toMemberId) {
        Follow existingFollow1 = followRepository.findById_ToMemberAndId_FromMember(toMemberId, fromMemberId);
        Follow existingFollow2 = followRepository.findById_FromMemberAndId_ToMember(fromMemberId, toMemberId);

        if (existingFollow1 != null) {
            followRepository.delete(existingFollow1);
        }
        if (existingFollow2 != null) {
            followRepository.delete(existingFollow2);
        }
    }

    //현재 로그인한 사용자의 ID를 추출하는 메서드
    private Long extractMemberId() {
        Object memberIdObject = memberService.extractMemberInfo().get("id");
        if (memberIdObject instanceof Long) {
            return (Long) memberIdObject;
        } else if (memberIdObject instanceof Integer) {
            return ((Integer) memberIdObject).longValue();
        } else {
            throw new BusinessLogicException(ExceptionCode.INVALID_MEMBER_ID);
        }
    }
}
