package com.party.chatting.dto;

import lombok.Getter;

import java.time.LocalDate;

@Getter
public class ChattingDto {
    private Long roomId;
    private String sender;
    private String message;
    private LocalDate date;
}
