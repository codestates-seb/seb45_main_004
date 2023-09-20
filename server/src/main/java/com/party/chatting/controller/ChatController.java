package com.party.chatting.controller;

import com.party.chatting.dto.ChatMessageDto;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ChatController {
    private final SimpMessageSendingOperations messageSendingTemplate;

    @MessageMapping("/chat/message")
    public void message(ChatMessageDto chatMessageDto) {
        messageSendingTemplate.convertAndSend("/sub/chat/board/" + chatMessageDto.getChatRoomId(), chatMessageDto.getMessage());
    }
}
