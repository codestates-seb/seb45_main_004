package com.party.card.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
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

    public enum CardStatus{

    }
}
