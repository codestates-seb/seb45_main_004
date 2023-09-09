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
    private final MemberService memberService;
    private final MemberRepository memberRepository;

    //팔로우 추가
    public Follow followMember(Long toMemberId) {

        //현재 로그인한 사용자의 ID를 추출
        Long fromMemberId = extractMemberId();

        //사용자 존재 여부, 팔로우 가능 여부 검증
        validateMembersExist(fromMemberId, toMemberId);
        validateFollow(fromMemberId, toMemberId);

        Follow follow = processCreateFollow(fromMemberId, toMemberId);
        return followRepository.save(follow);
    }

    //팔로워수 조회
    public Long countFollowers(Long memberId) {
        return followRepository.countByToMember_Id(memberId);
    }

    //팔로잉수 조회
    public Long countFollowings(Long memberId) {
        return followRepository.countByFromMember_Id(memberId);
    }


    //팔로우 취소
    public void unFollowMember(Long toMemberId) {
        Long fromMemberId = extractMemberId();

        //사용자 존재 여부 검증
        validateMembersExist(fromMemberId, toMemberId);

        Follow follow = followRepository.findByToMember_IdAndFromMember_Id(toMemberId, fromMemberId);
        if (follow != null) {
            followRepository.delete(follow);
        } else {
            throw new BusinessLogicException(ExceptionCode.FOLLOW_NOT_FOUND);
        }
    }

    //사용자 검증
    private void validateMembersExist(Long fromMemberId, Long toMemberId) {
        Optional<Member> toMemberOptional = memberRepository.findById(toMemberId);
        if (toMemberOptional.isEmpty()) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
        }

        if (fromMemberId.equals(toMemberId)) {
            throw new BusinessLogicException(ExceptionCode.OWN_MEMBER);
        }
    }

    //팔로우 관계 검증
    private void validateFollow(Long fromMemberId, Long toMemberId) {
        Follow follow = followRepository.findByToMember_IdAndFromMember_Id(toMemberId, fromMemberId);
        if (follow != null) {
            throw new BusinessLogicException(ExceptionCode.ALREADY_FOLLOWING);
        }
    }

    //팔로우 추가 로직
    private Follow processCreateFollow(Long fromMemberId, Long toMemberId) {
        Follow follow = new Follow();
        Member fromMember = new Member();
        fromMember.setId(fromMemberId);
        follow.setFromMember(fromMember);

        Member toMember = memberRepository.getById(toMemberId);
        follow.setToMember(toMember);

        return follow;
    }

    //현재 로그인한 사용자의 ID를 추출하는 메서드
    private Long extractMemberId () {
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

