package com.party.alram.dto;


import com.party.alram.entity.Alarm;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class AlarmResponse {
    private Long id;

    private String content;

    private Alarm.AlarmStatus alarmStatus;
}
