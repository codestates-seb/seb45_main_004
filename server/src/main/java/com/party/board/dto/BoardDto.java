package com.party.board.dto;

import com.party.board.entity.Board;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class BoardDto {

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Post{

        @NotBlank
        private String title;

        @NotBlank
        private String date;

        @NotBlank
        private String body;

        @NotBlank
        private String category;

        @NotNull
        private int person;

        private int money;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class ResponsePost extends Post {
        private long boardId;

        public ResponsePost(Board createdBoard) {
            super();
            this.boardId = createdBoard.getId();
        }
    }
}
