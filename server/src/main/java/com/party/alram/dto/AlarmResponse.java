package com.party.alram.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.party.alram.entity.Alarm;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AlarmResponse {
    private Long id;

    private String content;

    private Alarm.AlarmStatus alarmStatus;
}
