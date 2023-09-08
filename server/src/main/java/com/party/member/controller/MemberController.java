package com.party.member.controller;

import com.party.exception.BusinessLogicException;
import com.party.exception.ExceptionCode;
import com.party.member.dto.MemberPatchDto;
import com.party.member.dto.MemberPostDto;
import com.party.member.entity.Member;
import com.party.member.mapper.MemberMapper;
import com.party.member.service.MemberService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Transactional
@Service
@RequiredArgsConstructor
@RestController
@RequestMapping(("/members"))
public class MemberController {
    private final MemberService memberService;
    private final MemberMapper mapper;

    @PostMapping
    public ResponseEntity postMember(@Valid @RequestBody MemberPostDto memberPostDto) {
        Member member = memberService.createMember(mapper.memberPostDtoToMember(memberPostDto));
        member.setIntroduce("기본 소개글");
        return new ResponseEntity<>(mapper.memberToMemberResponseDto(member), HttpStatus.CREATED);
    }

    @GetMapping("/{memberEmail}")
    public ResponseEntity getMember(@PathVariable("memberEmail") String memberEmail) {
        Member member = memberService.findMember(memberEmail);
        return new ResponseEntity(mapper.memberToMemberResponseDto(member), HttpStatus.OK);
    }


    // 파라미터의 회원 id와 토큰의 id를 비교해서 동일한 회원이면 update실행
    @PatchMapping("/{memberEmail}")
    public ResponseEntity patchMember(@PathVariable("memberEmail") String memberEmail,
                                      @RequestBody MemberPatchDto memberPatchDto) {
        String loginMemberEmail = (String) memberService.extractMemberInfo().get("email");
        if(!loginMemberEmail.equals(memberEmail)) throw new BusinessLogicException(ExceptionCode.PERMISSION_NOT_EXIST);

        Member member = mapper.memberPatchDtoToMember(memberPatchDto);
        member.setEmail(loginMemberEmail);

        Member updateMember = memberService.updateMember(member);

        return new ResponseEntity(mapper.memberToMemberResponseDto(updateMember), HttpStatus.OK);
    }

    @DeleteMapping("/{memberEmail}")
    public void deleteMember(@PathVariable("memberEmail") String memberEmail) {
        String loginMemberEmail = (String) memberService.extractMemberInfo().get("email");
        System.out.println(memberEmail);
        System.out.println(loginMemberEmail);
        if(!loginMemberEmail.equals(memberEmail)) throw new BusinessLogicException(ExceptionCode.PERMISSION_NOT_EXIST);
        memberService.deleteMember(memberEmail);
    }
}
