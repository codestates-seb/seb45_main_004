package com.party.chatting.entity;

import com.party.card.entity.Card;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Chatting {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long chattingId;

    private int chattingUnread;

    @OneToOne(mappedBy = "Chatting")
    private Card card;
}
