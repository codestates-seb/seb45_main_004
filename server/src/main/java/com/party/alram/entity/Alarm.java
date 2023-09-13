package com.party.alram.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.party.board.entity.Board;
import com.party.member.entity.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.parameters.P;

import javax.persistence.*;

@NoArgsConstructor
@Entity
@Getter
@Setter
public class Alarm {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @Enumerated(value = EnumType.STRING)
    private AlarmStatus alarmStatus;

    private String content;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    @JsonBackReference
    private Member member;

    @ManyToOne
    @JoinColumn(name = "Board_ID")
    private Board board;

    public enum AlarmStatus {
        BOARD_CREATED("모임 생성"),
        BOARD_UPDATE("모임 인원 증가"),
        BOARD_CLOSED("모임 마감");

        @Getter
        private String alarmStatus;
        AlarmStatus(String alarmStatus){
            this.alarmStatus = alarmStatus;
        }

    }

    @Builder
    public Alarm (Member member, Board board, AlarmStatus alarmStatus, String content){
        this.member = member;
        this.board = board;
        this.alarmStatus = alarmStatus;
        this.content = content;
    }
    public static Alarm create (Member member, Board board, AlarmStatus alarmStatus, String content){
        return Alarm.builder().member(member).board(board).alarmStatus(alarmStatus).content(content).build();
    }
}
