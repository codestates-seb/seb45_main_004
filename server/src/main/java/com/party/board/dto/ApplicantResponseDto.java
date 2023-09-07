package com.party.board.dto;


import com.party.board.entity.Board;
import com.party.member.entity.Member;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ApplicantResponseDto {

    private Long id;
    private String memberImageUrl;
    private Long memberId;
    private Long boardId;
    private String boardImageUrl;

    public Member getMember(){
        Member member = new Member();
        member.setId(memberId);
        member.setImageUrl(memberImageUrl);
        return member;
    }

    public Board getBoard(){
        Board board = new Board();
        board.setId(boardId);
        board.setImageUrl(boardImageUrl);
        return board;
    }
}
