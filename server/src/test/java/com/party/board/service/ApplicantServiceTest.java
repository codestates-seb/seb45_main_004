package com.party.board.service;

import com.party.board.dto.BoardDto;

import com.party.board.entity.Applicant;
import com.party.board.entity.Board;
import com.party.board.service.ApplicantService;
import com.party.exception.BusinessLogicException;
import com.party.member.entity.Member;
import com.party.member.service.MemberService;
import lombok.extern.slf4j.Slf4j;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.httpBasic;


@Slf4j
@AutoConfigureMockMvc
@ActiveProfiles(profiles = "local")
class ApplicantServiceTest {

    @Autowired
    private MockMvc mockMvc;
    private final ApplicantService applicantService;
    private final MemberService memberService;
    private final BoardService boardService;

    @Autowired
    ApplicantServiceTest(
            ApplicantService applicantService,
            MemberService memberService,
            BoardService boardService) {
        this.applicantService = applicantService;
        this.memberService = memberService;
        this.boardService = boardService;
    }


//    @BeforeEach
//    void beforeEach (){
//
//        //테스트 시작할 때 마다 멤버 새로 생성
//        Member member1 = Member.createMember("1111@gmail.com", "123456789", "멤버 1", "여성");
//        Member member2 = Member.createMember("2222@gmail.com", "123456789", "멤버 2", "여성");
//        Member member3 = Member.createMember("3333@gmail.com", "123456789", "멤버 3", "여성");
//
//        //테스트 시작할 때 마다 모임 글을 새로 생성
//        BoardDto.Post board = new BoardDto.Post();
//        board.setTitle("글 제목");
//        board.setBody("글 내용");
//        board.setCategory("CATEGORY_LEISURE");
//        board.setMoney(10000);
//        board.setTotalNum(5);
//        boardService.createBoard(board);
//
//    }
//
//    @AfterEach
//    void afterEach(){
//        //테스트가 끝날 때 마다 멤버, 글 삭제
//        memberService.deleteMember(1);
//        memberService.deleteMember(2);
//        memberService.deleteMember(3);
//
//        //boardService.
//    }

    @Test
    @DisplayName("내가 작성한 모임 참여가 되는지 확인하는 테스트")
    void joinBoard1() {
        //테스트 시작할 때 마다 모임 글을 새로 생성
        BoardDto.Post board = new BoardDto.Post();
        board.setTitle("글 제목");
        board.setBody("글 내용");
        board.setCategory("CATEGORY_LEISURE");
        board.setMoney(10000);
        board.setTotalNum(5);
        boardService.createBoard(board);

//        Applicant applicant = applicantService.joinBoard(1,false);
        // 해당 테스트에서 예외가 발생해야 함
        assertThrows(BusinessLogicException.class, () -> {
            applicantService.joinBoard(1, false);
        });
       // assertNotNull(applicant);

        // 모임 참여 후 참여자 수가 1인지 확인
        Board board1 = boardService.findBoard(1);
        assertNotNull(board1);
        assertEquals(1, board1.getCurrentNum());

    }


    @Test
    @DisplayName("내가 참여한 모임을 조회하는 테스트")
    void findJoinedBoard() {
    }

    @Test
    @DisplayName("특정 모임의 참여 인원을 조회하는 테스트")
    void findJoinedMember() {
    }
}