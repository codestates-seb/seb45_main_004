package com.party.image.entity;

import com.party.board.entity.Board;
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
    @JoinColumn(name = "Board_ID")
    private Board board;
}
