package com.party.board.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.party.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Applicant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String memberImageUrl;
    private String memberNickname;

    private String boardImageUrl;

    private boolean isJoin;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    @JsonBackReference
    private Member member;

    @ManyToOne
    @JoinColumn(name = "Board_ID")
    private Board board;
}