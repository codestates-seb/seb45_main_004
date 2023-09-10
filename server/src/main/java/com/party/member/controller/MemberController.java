package com.party.member.controller;

import com.party.exception.BusinessLogicException;
import com.party.exception.ExceptionCode;
import com.party.member.dto.MemberPatchDto;
import com.party.member.dto.MemberPostDto;
import com.party.member.entity.Member;
import com.party.member.mapper.MemberMapper;
import com.party.member.repository.MemberRepository;
import com.party.member.service.MemberService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@Transactional
@RestController
@RequestMapping("/members")
@Slf4j
public class MemberController {
    private final MemberService memberService;
    private final MemberMapper mapper;
    private final MemberRepository memberRepository;

    public MemberController(MemberService memberService, MemberMapper mapper, MemberRepository memberRepository) {
        this.memberService = memberService;
        this.mapper = mapper;
        this.memberRepository = memberRepository;
    }

    @PostMapping
    public ResponseEntity postMember(@Valid @RequestBody MemberPostDto memberPostDto) {
        Member member = memberService.createMember(mapper.memberPostDtoToMember(memberPostDto));
        member.setIntroduce("기본 소개글");
        return new ResponseEntity<>(mapper.memberToMemberResponseDto(member), HttpStatus.CREATED);
    }

    // 해당 회원과 관련된 정보를 모두 조회 -> 마이페이지 전용
    @GetMapping("/{member-id}")
    public ResponseEntity getMember(@PathVariable("member-id") long memberId) {
        log.info("memberRepository: " + memberRepository);
        log.info("mapper: " + mapper);
        Member member = memberService.findMember(memberId);
        return new ResponseEntity(mapper.memberToMemberResponseDto(member), HttpStatus.OK);
    }

    // 간단하게 회원의 id와 nickname email만 조회해서 목록화
    @GetMapping
    public ResponseEntity getMembers() {
        log.info("memberRepository: " + memberRepository);
        log.info("mapper: " + mapper);
        List<Member> members = memberService.findMembers();
        return new ResponseEntity(mapper.memberToSimpleMemberResponseDto(members), HttpStatus.OK);
    }

    // 파라미터의 회원 id와 토큰의 id를 비교해서 동일한 회원이면 update실행
    @PatchMapping("/{member-id}")
    public ResponseEntity patchMember(@PathVariable("member-id") long memberId,
                                      @RequestBody MemberPatchDto memberPatchDto) {
        int loginMemberEmail = (int) memberService.extractMemberInfo().get("id");
        if(loginMemberEmail != memberId) throw new BusinessLogicException(ExceptionCode.PERMISSION_NOT_EXIST);

        Member member = mapper.memberPatchDtoToMember(memberPatchDto);
        member.setId((long) loginMemberEmail);

        Member updateMember = memberService.updateMember(member);

        return new ResponseEntity(mapper.memberToMemberResponseDto(updateMember), HttpStatus.OK);
    }

    @DeleteMapping("/{member-id}")
    public void deleteMember(@PathVariable("member-id") long memberId) {
        int loginMemberEmail = (int) memberService.extractMemberInfo().get("id");
        System.out.println(memberId);
        System.out.println(loginMemberEmail);
        if(loginMemberEmail != memberId) throw new BusinessLogicException(ExceptionCode.PERMISSION_NOT_EXIST);
        memberService.deleteMember(memberId);
    }
}


