package com.party.board.dto;


import com.party.board.entity.Board;
import com.party.member.entity.Member;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ApplicantResponseDto {

    private Long id;
    private String imageUrl;
    private Long memberId;
    private Long boardId;

    public Member getMember(){
        Member member = new Member();
        member.setId(memberId);
        member.setImageUrl(imageUrl);
        return member;
    }

    public Board getBoard(){
        Board board = new Board();
        board.setId(boardId);
        return board;
    }
}
