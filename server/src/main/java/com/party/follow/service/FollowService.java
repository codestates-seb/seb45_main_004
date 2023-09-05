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


@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class FollowService {

    private final FollowRepository followRepository;
    private final MemberRepository memberRepository;
    private final MemberService memberService;

    //팔로우 추가
    public void followMember(Long toMemberId,Long fromMemberId) {

//        // 현재 로그인한 사용자의 ID 가져오기
//        Long loggedInMemberId = extractMemberId();

        //팔로우를 추가하기 전에 해당 멤버가 존재하는지 확인
        Member toMember = memberRepository.findById(toMemberId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        Member fromMember = memberRepository.findById(fromMemberId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        //이미 팔로우 관계가 있는지 확인
        if (followRepository.findById_ToMemberAndId_FromMember(toMemberId, fromMemberId) != null) {
            throw new BusinessLogicException(ExceptionCode.ALREADY_FOLLOWING);
        }

        //새로운 팔로우 엔티티를 생성
        Follow follow = new Follow(fromMember.getId(), toMember.getId());

        //팔로우 저장
        followRepository.save(follow);
    }

//    // 현재 로그인한 사용자의 ID를 추출하는 메서드
//    private Long extractMemberId() {
//        Object memberIdObject = memberService.extractMemberInfo().get("id");
//        if (memberIdObject instanceof Long) {
//            return (Long) memberIdObject;
//        } else if (memberIdObject instanceof Integer) {
//            return ((Integer) memberIdObject).longValue();
//        } else {
//            throw new BusinessLogicException(ExceptionCode.INVALID_MEMBER_ID);
//        }
//    }
}
