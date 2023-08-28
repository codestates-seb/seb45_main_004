package com.party.cardlike.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
public class CardLikeResponseDto {
    private long likeCount;
    private boolean isLiked;

    public CardLikeResponseDto(long likeCount, boolean isLiked) {
        this.likeCount = likeCount;
        this.isLiked = isLiked;
    }
}
