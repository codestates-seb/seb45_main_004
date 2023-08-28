package com.party.card.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

public class CardDto {

    @Getter
    @Setter
    @NotBlank
    public static class Post{
        @NotBlank
        private String title;
        @NotBlank
        private String body;
    }
}
