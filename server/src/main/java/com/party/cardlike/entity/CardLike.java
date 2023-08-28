package com.party.cardlike.entity;

import com.party.card.entity.Card;
import com.party.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Getter
@Setter
public class CardLike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cardLikeId;

    @Column
    private boolean isLiked;
    private long cardLikeCount;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CARD_ID")
    private Card card;
}
