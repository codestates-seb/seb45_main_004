package com.party.board.dto;

import com.party.board.entity.Board;
import com.party.member.entity.Member;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class BoardResponseDto {

    private long boardId;
    private long memberId;
    private String memberNickname;
    private String title;
    private LocalDate date;
    private String body;
    private String category;
    private String latitude;
    private String longitude;
    private String address;
    private int totalNum;
    private int currentNum;
    private int money;
    private long boardLikesCount;
    private Board.BoardStatus boardStatus;
    private String imageUrl;
    private String memberImageUrl;

    public Member getMember() {
        Member member = new Member();
        member.setId(memberId);
        member.setNickname(memberNickname);
        member.setImageUrl(memberImageUrl);
        return member;
    }

    public String getBoardStatus() {
        return boardStatus.getStatus();
    }
}