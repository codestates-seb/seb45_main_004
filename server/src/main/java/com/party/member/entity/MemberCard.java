package com.party.member.entity;

import com.party.card.entity.Card;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class MemberCard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberCardId;

    /*
    history, store 구현
     */

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "CARD_ID")
    private Card card;


}
