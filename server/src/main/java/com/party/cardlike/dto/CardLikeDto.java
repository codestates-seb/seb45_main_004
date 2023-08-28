package com.party.cardlike.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class CardLikeDto {

    @Getter @Setter
    @NoArgsConstructor
    public static class Post{
        private boolean isLiked;
    }
}
