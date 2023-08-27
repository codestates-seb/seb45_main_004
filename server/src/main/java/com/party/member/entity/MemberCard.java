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

    @Enumerated(value = EnumType.STRING)
    private CardType cardType;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "CARD_ID")
    private Card card;

    public enum CardType {
        HISTORY("나의 모임"),
        STORE("찜");

        @Getter
        private String status;

        CardType(String status) {
            this.status = status;
        }
    }
}
