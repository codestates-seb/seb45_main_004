package com.party.alram;

import com.party.alram.service.AlarmService;
import com.party.board.entity.Board;
import com.party.member.entity.Member;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
public class NotificationEventHandler{
    private final AlarmService alarmService;

    public NotificationEventHandler(AlarmService alarmService) {
        this.alarmService = alarmService;
    }

    //모임 글 작성자에게 알림 전송
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void saveNotification (Member member, Board board){
        System.out.println("알림 리스너가 들음");
        alarmService.sendBoardCreatedNotification(member, board);
    }

    //모임 글 참가자에게 알림 전송
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void sendToNotification (NotificationEvent notificationEvent){
        System.out.println("알림 리스너가 들음 - 참여자에게 알림 전송");
        alarmService.sendParticipantsNotification(notificationEvent.getBoard());
    }

    //모임 마감시 알림 전송
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void closedNotification (NotificationEvent notificationEvent){
        System.out.println("알림 리스너가 들음2 - 마감");
        alarmService.sendCompletedNotification(notificationEvent.getBoard());
    }

}
