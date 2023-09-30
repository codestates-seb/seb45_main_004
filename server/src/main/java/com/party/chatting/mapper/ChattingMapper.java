package com.party.chatting.mapper;

import com.party.chatting.Dto.ChattingDto;
import com.party.chatting.entity.Chatting;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ChattingMapper {
    Chatting ChattingDtoToChatting(ChattingDto chattingDto);
}
