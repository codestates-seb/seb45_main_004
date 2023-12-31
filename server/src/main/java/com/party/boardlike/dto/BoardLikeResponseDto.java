package com.party.boardlike.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
public class BoardLikeResponseDto {
    private long likeCount;
    private boolean isLiked;

    public BoardLikeResponseDto(long likeCount, boolean isLiked) {
        this.likeCount = likeCount;
        this.isLiked = isLiked;
    }
}
