package com.party.image.entity;

import com.party.card.entity.Card;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class CardImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cardImageId;

    @ManyToOne
    @JoinColumn(name = "CARD_ID")
    private Card card;
}
