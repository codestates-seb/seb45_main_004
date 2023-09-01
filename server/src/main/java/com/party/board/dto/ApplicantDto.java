package com.party.board.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class ApplicantDto {
    @Getter
    @Setter
    @NoArgsConstructor
    public static class Post {
        private boolean isJoin;
    }
}
