package com.party.board.dto;

import com.party.board.entity.Board;
import com.party.member.entity.Member;
import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class BoardResponseDto {

    private long boardId;
    private long memberId;
    private String memberNickname;
    private String title;
    private String date;
    private String body;
    private String category;
    private int currentPerson;
    private int totalPerson;
    private int money;
    private long boardLikesCount;
    private Board.BoardStatus boardStatus;

    public Member getMember() {
        Member member = new Member();
        member.setId(memberId);
        member.setNickname(memberNickname);
        return member;
    }

    public String getBoardStatus() {
        return boardStatus.getStatus();
    }
}