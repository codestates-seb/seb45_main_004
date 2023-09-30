package com.party.chatting.mapper;

import com.party.chatting.dto.ChattingDto;
import com.party.chatting.entity.Chatting;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ChattingMapper {
    Chatting ChattingDtoToChatting(ChattingDto chattingDto);
}
