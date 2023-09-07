package com.party.member.dto;

import com.party.board.entity.Board;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberBoardLikeResponseDto {
    private Long id;
    private Long boardId;
    public Board getBoard(){
        Board board = new Board();
        board.setId(boardId);
        return board;
    }
}
