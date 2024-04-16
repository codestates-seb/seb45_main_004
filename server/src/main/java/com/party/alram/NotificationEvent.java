package com.party.alram;

import com.party.board.entity.Board;
import com.party.member.entity.Member;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEvent;

//알림을 보내기위해 필요한 정보를 가지고 있는 event 클래스
@Getter
@RequiredArgsConstructor
public class NotificationEvent {

    private Member member;
    private Board board;
    private static NotificationEventHandler notificationEventHandler;

    public static NotificationEvent createBoard(Member member, Board board){
        System.out.println("여기 거침");
        notificationEventHandler.saveNotification(member, board);
        return new NotificationEvent();
    }

    public static ApplicationEvent closedBoard(Member member, Board board){
        System.out.println("여기 거침 1");

        return null;
    }
}
