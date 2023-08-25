package com.party.card.entity;

import com.party.chatting.entity.Chatting;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

@NoArgsConstructor
@Entity
@Getter
@Setter
public class Card {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cardId;

    private String cardTitle;

    private String cardBody;

    private Date cardDate;

    private int cardLike;

    private int cardMoney;

    private long cardMap;

    private CardStatus cardStatus;

    private LocalDateTime createdAt = LocalDateTime.now();

    @OneToOne
    @JoinColumn(name = "CHATTING_ID")
    private Chatting chatting;

    public enum CardStatus{

    }
}
