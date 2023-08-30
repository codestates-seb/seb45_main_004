package com.party.card.dto;

import com.party.card.entity.Card;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

public class CardDto {

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Post{

        @NotBlank
        private String cardTitle;

        @NotBlank
        private String cardDate;

        @NotBlank
        private String cardBody;

        private int cardPerson;

        private int cardMoney;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class ResponsePost extends Post {
        private long cardId;

        public ResponsePost(Card createdCard) {
            super();
            this.cardId = createdCard.getCardId();
        }
    }
}
