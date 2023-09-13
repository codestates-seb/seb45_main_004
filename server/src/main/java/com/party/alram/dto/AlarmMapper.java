package com.party.alram.dto;

import com.party.alram.entity.Alarm;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AlarmMapper {

    @Mapping(source = "member.id", target = "memberId")
    @Mapping(source = "board.id", target = "boardId")
    AlarmResponseDto mapToAlarmResponse(Alarm alarm);
    List<AlarmResponseDto> alarmToAlarmResponseDto (List<Alarm> alarms);
}
