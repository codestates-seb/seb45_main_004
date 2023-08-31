package com.party.member.dto;

import com.party.board.entity.Board;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BoardSimpleResponseDto {
    private Long id;
    private String title;
    private Board.BoardStatus status;
    private long boardLikesCount;
}
