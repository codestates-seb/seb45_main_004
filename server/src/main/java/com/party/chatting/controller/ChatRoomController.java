package com.party.chatting.controller;

import com.party.chatting.dto.ChatRoomDto;
import com.party.chatting.entity.ChatRoom;
import com.party.chatting.mapper.ChatMapper;
import com.party.chatting.repository.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/chat")
public class ChatRoomController {

    private final ChatRoomRepository chatRoomRepository;
    private final ChatMapper mapper;

    @PostMapping("/room")
    public ChatRoom creatChatRoom(ChatRoomDto chatRoomDto) {
        ChatRoom chatRoom = mapper.chatRoomDtoToChatRoom(chatRoomDto);
        return chatRoomRepository.save(chatRoom);
    }
}
