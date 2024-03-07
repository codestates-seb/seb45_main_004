package com.party.board.service;

import com.party.alram.entity.Alarm;
import com.party.alram.service.AlarmService;
import com.party.board.dto.BoardDto;
import com.party.board.entity.Applicant;
import com.party.board.entity.Board;
import com.party.board.repository.ApplicantRepository;
import com.party.board.repository.BoardRepository;
import com.party.exception.BusinessLogicException;
import com.party.exception.ExceptionCode;
import com.party.image.service.AwsService;
import com.party.member.entity.Member;
import com.party.member.repository.MemberRepository;
import com.party.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;


@Service
@Transactional
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;
    private final MemberService memberService;
    private final MemberRepository memberRepository;
    private final ApplicantRepository applicantRepository;
    private final AlarmService alarmService;

    //모임글 등록
    public Board createBoard(BoardDto.Post postDto) {

        Member member = findMember(extractMemberId());
        Board board = processCreateBoard(postDto, member);
        saveApplicantForBoardCreat(board, member);

        //작성한 모임 저장
        Board savedBoard = boardRepository.save(board);
        //알림 발송
        notifyCreateBoard(member, board);

        return savedBoard;
    }

    //모임글 상세 조회
    public Board findBoard(long boardId) {
        return boardRepository.findByIdWithAll(boardId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.BOARD_NOT_FOUND));
    }

    //모임글 전체 조회(최신순)
    public List<Board> findBoards() {
        return boardRepository.findAll();
    }

    //모임글 전체 조회(좋아요순)
    public List<Board> findBoardsByLikesCountDesc() {
        return boardRepository.findAllByOrderByBoardLikesCountDesc();
    }

    //모임글 카테고리 별 조회(최신순)
    public List<Board> findBoardsByCategory(Board.BoardCategory category) {
        return boardRepository.findByCategory(category);
    }

    //모임글 카테고리 별 조회(좋아요순)
    public List<Board> findByCategoryAndOrderByLikesDesc(Board.BoardCategory category) {
        return boardRepository.findByCategoryOrderByBoardLikesCountDesc(category);
    }

    //제목으로 모임글 검색(전체글)
    public List<Board> searchBoardsByTitle(String title) {
        return boardRepository.findByTitleContaining(title);
    }

    //제목+내용으로 모임글 검색(전체글)
    public List<Board> searchBoardsByTitleAndBody(String title,String body) {
        return boardRepository.findByTitleContainingOrBodyContaining(title, body);
    }

    //제목으로 모임글 검색(카테고리별)
    public List<Board> searchBoardsByCategoryAndTitle(Board.BoardCategory category, String title) {
        return boardRepository.findByCategoryAndTitleContaining(category, title);
    }

    //제목+내용으로 모임글 검색(카테고리별)
    public List<Board> searchBoardsByCategoryAndTitleAndBody(Board.BoardCategory category1,
                                                             String title,
                                                             Board.BoardCategory category2,
                                                             String body) {
        return boardRepository.findByCategoryAndTitleContainingOrCategoryAndBodyContaining(category1, title,category2, body);
    }


    //모임글 생성 로직
    private Board processCreateBoard(BoardDto.Post postDto, Member member) {
        Board.BoardCategory boardCategoryEnum = Board.BoardCategory.valueOf(postDto.getCategory());
        Board board = new Board();
        board.setTitle(postDto.getTitle());
        board.setDate(postDto.getDate());
        board.setBody(postDto.getBody());
        board.setTotalNum(postDto.getTotalNum());
        board.setMoney(postDto.getMoney());
        board.setMember(member);
        board.setCategory(boardCategoryEnum);
        board.setLatitude(postDto.getLatitude());
        board.setLongitude(postDto.getLongitude());
        board.setAddress(postDto.getAddress());
        board.setImageUrl(postDto.getImageUrl());
        return board;
    }

    //작성한 모임 참여 처리
    private void saveApplicantForBoardCreat(Board board, Member member) {
        Applicant applicant = new Applicant();
        applicant.setBoard(board);
        applicant.setJoin(true);
        applicant.setMember(member);
        applicant.setMemberImageUrl(member.getImageUrl());
        applicant.setBoardImageUrl(board.getImageUrl());
        applicantRepository.save(applicant);

    }

    //날짜지난 모임 마감처리
    @Scheduled(cron = "0 0 0 * * *")
    public void checkDate(){
        LocalDate today = LocalDate.now();
        List<Board> closedList = findEventsScheduledForDate(today.plus(2, ChronoUnit.DAYS));

        for (Board board : closedList){
            board.setStatus(Board.BoardStatus.BOARD_STATUS);
            String rootImagePath = board.getImageUrl();
            String cutPath = rootImagePath.substring(0, rootImagePath.length()-4);
            System.out.println(cutPath);
            board.setImageUrl(cutPath+"-closed.png");
            boardRepository.save(board);
            //알림 발송
            notifyDeadline(board);
        }
    }

    //memberId 값 형변환
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

    //member 조회
    private Member findMember(Long memberId) {
        Optional<Member> memberOptional = memberRepository.findById(memberId);
        if (!memberOptional.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
        }
        return memberOptional.get();
    }

    //해당 날짜에 예정된 모임 검색(이메일 발송 관련 메서드)
    public List<Board> findEventsScheduledForDate(LocalDate eventDate) {
        return boardRepository.findByDate(eventDate);
    }

    //모임글 작성 시 알림 전송 (알림 발송 관련 메서드)
    private void notifyCreateBoard (Member member, Board board){
        alarmService.sendBoardCreatedNotification(member,board);
    }

    //날짜 지난 모임 마감 알림 전송 (알림 발송 관련 메서드)
    private void notifyDeadline (Board board){
        alarmService.sendCompletedNotification(board);
    }


}
