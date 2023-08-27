package com.party.card.entity;

import com.party.chatting.entity.Chatting;
import com.party.image.entity.CardImage;
import com.party.member.entity.MemberCard;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

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

    @OneToMany(mappedBy = "category", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<CardCategory> cardCategories;

    @Enumerated(value = EnumType.STRING)
    private CardStatus cardStatus = CardStatus.CARD_RECRUITING;

    private LocalDateTime createdAt = LocalDateTime.now();

    @OneToOne
    @JoinColumn(name = "CHATTING_ID")
    private Chatting chatting;

    @OneToMany(mappedBy = "card",cascade = CascadeType.REMOVE)
    private List<CardImage> images = new ArrayList<>();

    @OneToMany(mappedBy = "card",cascade = CascadeType.REMOVE)
    private List<MemberCard> memberCards = new ArrayList<>();

    public enum CardStatus {
        CARD_RECRUITING("모집 중"),
        CARD_ClOSED("모집 마감"),
        ;

        @Getter
        private String status;

        CardStatus(String status) {
            this.status = status;
        }
    }
}
