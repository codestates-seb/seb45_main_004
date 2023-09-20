package com.party.chatting.mapper;

import com.party.chatting.dto.ChatRoomDto;
import com.party.chatting.entity.ChatRoom;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Mapper(componentModel = "spring")
@Component
public interface ChatMapper {
    ChatRoom chatRoomDtoToChatRoom(ChatRoomDto chatRoomDto);
}
