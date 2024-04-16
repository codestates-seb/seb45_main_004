package com.party.board.service;

import com.party.alram.NotificationEvent;
import com.party.alram.entity.Alarm;
import com.party.alram.service.AlarmService;
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
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;



@Service
@RequiredArgsConstructor
@Transactional
public class ApplicantService {
    private final MemberService memberService;
    private final ApplicantRepository applicantRepository;
    private final BoardRepository boardRepository;
    private final MemberRepository memberRepository;
    private final AlarmService alarmService;
    private final ApplicationEventPublisher eventPublisher;


    //모임 참여
    public Applicant joinBoard(long boardId, boolean isJoin){
        //해당 모임에 참여했는지 확인
        Long memberId = extractMemberId();
        isJoinAlready(boardId, memberId);

        //모임 참여 로직
        Applicant applicant = new Applicant();
        Board board = boardRepository.getById(boardId); //보드 정보 가져오기
        applicant.setBoard(board);
        applicant.setBoardImageUrl(board.getImageUrl());
        Member member = memberRepository.getById(memberId); //멤버 정보 가져오기
        applicant.setMember(member);
        applicant.setMemberImageUrl(member.getImageUrl());
        applicant.setMemberNickname(member.getNickname());

        //현재 모임 참여 인원 수 업데이트
        if(board.getCurrentNum() < board.getTotalNum()){
            board.setCurrentNum(board.getCurrentNum()+1);

            if (board.getCurrentNum() == board.getTotalNum()){
                board.setStatus(Board.BoardStatus.BOARD_COMPLETE);
                String rootImagePath = board.getImageUrl();
                String cutPath = rootImagePath.substring(0, rootImagePath.length()-4);
                System.out.println(cutPath);
                board.setImageUrl(cutPath+"-closed.png");
                boardRepository.save(board);
                //알림
                //notifyCompleted(board);
                //notifyCompleted(board);
            }
        }else {//인원수 다 찼으면 추가 안함
            throw new BusinessLogicException(ExceptionCode.NOT_ALLOW_PARTICIPATE);
        }

        //참여 정보 저장
        Applicant savedApplicant = applicantRepository.save(applicant);
        //모임 참여 처리
        applicant.setJoin(true);
        //알림 발송
        eventPublisher.publishEvent(NotificationEvent.closedBoard(member,board));

        return savedApplicant;
    }

    //내가 참여한 모임 모두 조회
    public List<Applicant> findJoinedBoard(long memberId){
        return applicantRepository.findByMemberId(memberId);
    }


    //조회한 모임의 참여인원 모두 조회
    public List<Applicant> findJoinedMember(long boardId){
        return applicantRepository.findByBoardId(boardId);
    }


    //해당 모임에 참여했는지 검증
    private void isJoinAlready(Long boardId, Long memberId){
        boolean isJoinBord = applicantRepository.existsByBoardIdAndMemberId(boardId, memberId);
        if (isJoinBord){
            throw new IllegalArgumentException("YOU ALREADY JOIN");
        }
    }

    //모임 참여 중인 인원에게 알림 전송
    private void notifyParticipants(Board board){
        alarmService.sendParticipantsNotification(board);
    }

    //모임 참여 완료 알림 전송 (모임 참여 신청자에게 전송)
    private void notifyApplicant (Member member, Board board){
        alarmService.sendApplicantNotification(member,board);
    }

    //모임 모집 마감 알림 전송
    private void notifyCompleted(Board board){
        alarmService.sendCompletedNotification(board);
    }


    //멤버 검증 및 memberId 타입 변환
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
