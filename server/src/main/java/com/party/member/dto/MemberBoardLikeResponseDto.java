package com.party.member.dto;

import com.party.board.entity.Board;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberBoardLikeResponseDto {
    private Long id;
    private Long boardId;
    private String imgUrl;
}
