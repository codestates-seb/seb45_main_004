package com.party.alram.dto;

import com.party.alram.entity.Alarm;
import com.party.board.entity.Board;
import com.party.member.entity.Member;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-10-24T18:38:41+0900",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 11.0.18 (Azul Systems, Inc.)"
)
@Component
public class AlarmMapperImpl implements AlarmMapper {

    @Override
    public AlarmResponseDto mapToAlarmResponse(Alarm alarm) {
        if ( alarm == null ) {
            return null;
        }

        AlarmResponseDto alarmResponseDto = new AlarmResponseDto();

        alarmResponseDto.setMemberId( alarmMemberId( alarm ) );
        alarmResponseDto.setBoardId( alarmBoardId( alarm ) );
        alarmResponseDto.setContent( alarm.getContent() );
        alarmResponseDto.setAlarmStatus( alarm.getAlarmStatus() );

        return alarmResponseDto;
    }

    @Override
    public List<AlarmResponseDto> alarmToAlarmResponseDto(List<Alarm> alarms) {
        if ( alarms == null ) {
            return null;
        }

        List<AlarmResponseDto> list = new ArrayList<AlarmResponseDto>( alarms.size() );
        for ( Alarm alarm : alarms ) {
            list.add( mapToAlarmResponse( alarm ) );
        }

        return list;
    }

    private Long alarmMemberId(Alarm alarm) {
        if ( alarm == null ) {
            return null;
        }
        Member member = alarm.getMember();
        if ( member == null ) {
            return null;
        }
        Long id = member.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }

    private Long alarmBoardId(Alarm alarm) {
        if ( alarm == null ) {
            return null;
        }
        Board board = alarm.getBoard();
        if ( board == null ) {
            return null;
        }
        Long id = board.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }
}
