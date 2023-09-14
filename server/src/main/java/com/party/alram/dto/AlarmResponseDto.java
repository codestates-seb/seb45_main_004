package com.party.alram.dto;


import com.party.alram.entity.Alarm;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AlarmResponseDto {
    private Long memberId;

    private Long boardId;

    private String content;

    private Alarm.AlarmStatus alarmStatus;
}
