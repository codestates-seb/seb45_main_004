package com.party.board.service;

import com.party.board.dto.BoardDto;
import com.party.board.entity.Board;
import com.party.board.repository.BoardRepository;
import com.party.exception.BusinessLogicException;
import com.party.exception.ExceptionCode;
import com.party.member.entity.Member;
import com.party.member.repository.MemberRepository;
import com.party.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;
    private final MemberService memberService;
    private final MemberRepository memberRepository;

    // 모임글 등록
    public Board createBoard(BoardDto.Post postDto) {
        /* member 관련 주석

        Object memberIdObject  = memberService.extractMemberInfo().get("memberId");

        // Board 등록 시 memberid 값 저장
        Long memberId;
        if (memberIdObject instanceof Long) {
            memberId = (Long) memberIdObject;
        } else if (memberIdObject instanceof Integer) {
            memberId = ((Integer) memberIdObject).longValue();
        } else {
            // memberId가 올바른 형태로 추출되지 않은 경우 예외 처리
            throw new BusinessLogicException(ExceptionCode.INVALID_MEMBER_ID);
        }

        Optional<Member> memberOptional = memberRepository.findById(memberId);
        if (!memberOptional.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
        }
        Member member = memberOptional.get();

         */

        Board.BoardCategory boardCategoryEnum = Board.BoardCategory.valueOf(postDto.getCategory());

        Board board = new Board();

        String day = postDto.getDate();
        LocalDate date = stringToDateConverter(day);

        board.setTitle(postDto.getTitle());
        board.setDate(date);
        board.setBody(postDto.getBody());
        board.setPerson(postDto.getPerson());
        board.setMoney(postDto.getMoney());
//        board.setMember(member);
        board.setCategory(boardCategoryEnum);

        return boardRepository.save(board);
    }

    private LocalDate stringToDateConverter(String dateString) {

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate date = LocalDate.parse(dateString, formatter);
        return date;
    }

    //모임글 상세 조회
    public Board findBoard(long boardId) {
        return boardRepository.findByIdWithAll(boardId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.BOARD_NOT_FOUND));
    }

    //모임글 전체 조회
    public List<Board> findBoards() {
        return boardRepository.findAll();
    }
}
