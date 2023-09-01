package com.party.boardlike.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
public class BoardLikeResponseDto {
    private long likeCount;

    public BoardLikeResponseDto(long likeCount) {
        this.likeCount = likeCount;
    }
}
