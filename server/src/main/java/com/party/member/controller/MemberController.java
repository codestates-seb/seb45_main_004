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

    @GetMapping("/{member-id}")
    public ResponseEntity getMember(@PathVariable("member-id") long memberid) {
        Member member = memberService.findMember(memberid);
        return new ResponseEntity(mapper.memberToMemberResponseDto(member), HttpStatus.OK);
    }

    @PatchMapping("/{member-id}")
    public ResponseEntity patchMember(@PathVariable("member-id") long memberid,
                                      @RequestBody MemberPatchDto memberPatchDto) {
        System.out.println("업데이트 멤버 실행------------------------------------------------------------------");
        System.out.println(memberService.extractMemberInfo().toString());
        long loginMemberId = (long) memberService.extractMemberInfo().get("id");
        System.out.println("이다음엔 id가 옵니다");
//        System.out.println(loginMemberId);
        return new ResponseEntity("응답은 성공했음", HttpStatus.OK);
    }
}
