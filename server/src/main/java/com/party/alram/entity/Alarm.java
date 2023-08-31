package com.party.alram.entity;

import com.party.board.entity.Card;
import com.party.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Entity
@Getter
@Setter
public class Alarm {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long alarmId;

    @Enumerated
    private AlarmStatus alarmStatus;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "CARD_ID")
    private Card card;

    /* 알람 온 시간 표시?
    private LocalDateTime timestamp = LocalDateTime.now();
     */
    public enum AlarmStatus {

    }
}
