package com.party.card.entity;

import com.party.cardlike.entity.CardLike;
import com.party.chatting.entity.Chatting;
import com.party.image.entity.CardImage;
import com.party.member.entity.Applicant;
import com.party.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Entity
@Getter
@Setter
public class Card {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cardId;

    @Column(nullable = false)
    private String cardTitle;

    @Column(nullable = false)
    private String cardBody;

    @Column(nullable = false)
    private int cardPerson;

    @Column(nullable = false)
    private LocalDate cardDate;

    @Column(nullable = false)
    private int cardMoney;

    @Column(nullable = false)
    private long cardMap;

    @Column(nullable = false)
    @Enumerated(value = EnumType.STRING)
    private CardCategory cardCategory = CardCategory.CATEGORY_ETC;

    @Column(nullable = false)
    @Enumerated(value = EnumType.STRING)
    private CardStatus cardStatus = CardStatus.CARD_RECRUITING;

    private LocalDateTime createdAt = LocalDateTime.now();

    private long cardLikesCount;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @OneToOne
    @JoinColumn(name = "CHATTING_ID")
    private Chatting chatting;

    @OneToMany(mappedBy = "card",cascade = CascadeType.REMOVE)
    private List<CardImage> images = new ArrayList<>();

    @OneToMany(mappedBy = "card",cascade = CascadeType.REMOVE)
    private List<Applicant> memberCards = new ArrayList<>();

    @OneToMany(mappedBy = "card", cascade = CascadeType.REMOVE)
    private List<CardLike> cardLikes = new ArrayList<>();


    public enum CardCategory {
        CATEGORY_LEISURE("LEISURE"),
        CATEGORY_TRAVEL("TRAVEL"),
        CATEGORY_GAME("GAME"),
        CATEGORY_CULTURE("CULTURE"),
        CATEGORY_EDUCATION("EDUCATION"),
        CATEGORY_ETC("ETC");

        @Getter
        private String category;

        CardCategory(String category) {
            this.category = category;
        }
    }
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
