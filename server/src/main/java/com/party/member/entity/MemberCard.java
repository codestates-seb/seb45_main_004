package com.party.member.entity;

import com.party.card.entity.Card;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

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
        HISTORY("나의 모임", 0),
        STORE("찜", 1);

        @Getter
        private String status;
        @Getter
        private int num;

        CardType(String status, int num) {
            this.status = status;
            this.num = num;
        }
    }
}
