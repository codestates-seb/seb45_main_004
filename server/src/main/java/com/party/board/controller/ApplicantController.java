package com.party.board.controller;

import com.party.board.dto.ApplicantDto;
import com.party.board.entity.Applicant;
import com.party.board.mapper.ApplicantMapper;
import com.party.board.service.ApplicantService;
import com.party.exception.BusinessLogicException;
import com.party.exception.ExceptionCode;
import com.party.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping()
@RequiredArgsConstructor
public class ApplicantController {

    private final MemberService memberService;
    private final ApplicantService applicantService;
    private final ApplicantMapper mapper;

    //모임 참여
    @PostMapping ("/boards/{board-id}/join")
    public ResponseEntity postJoin(@PathVariable("board-id") long boardId,
                                   @RequestBody ApplicantDto.Post postDto){

        boolean isJoin = postDto.isJoin();

        Applicant join = applicantService.joinBoard(boardId, isJoin);
        return new ResponseEntity<>(mapper.applicantToApplicantResponseDto(join), HttpStatus.OK);
    }

    //내가 참여한 모임 조회
    @GetMapping("members/join")
    public ResponseEntity getJoinAll (){
        Long memberId = extractMemberId();
        List<Applicant> applicants = applicantService.findJoinedBoard(memberId);

        return new ResponseEntity<>(mapper.applicantsToApplicantsResponseDto(applicants), HttpStatus.OK);
    }



    //memberId 추출
    private Long extractMemberId() {
        Object memberIdObject  = memberService.extractMemberInfo().get("id");

        if (memberIdObject instanceof Long) {
            return (Long) memberIdObject;
        } else if (memberIdObject instanceof Integer) {
            return ((Integer) memberIdObject).longValue();
        } else {
            throw new BusinessLogicException(ExceptionCode.INVALID_MEMBER_ID);
        }
    }
}
