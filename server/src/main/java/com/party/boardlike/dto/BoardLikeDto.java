package com.party.boardlike.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class BoardLikeDto {

    @Getter @Setter
    @NoArgsConstructor
    public static class Post{
        private boolean isLiked;
    }
}
