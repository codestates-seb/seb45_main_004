package com.party.card.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

public class CardDto {

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Post{
        private long memberId;

        @NotBlank
        private String cardTitle;

        @NotBlank
        private String cardDate;

        @NotBlank
        private String cardBody;

        private int cardPerson;

        private int cardMoney;

    }
}
