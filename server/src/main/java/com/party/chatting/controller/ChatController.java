package com.party.chatting.controller;

import com.party.chatting.dto.ChatMessageDto;
import com.party.chatting.entity.Chat;
import com.party.chatting.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ChatController {
    private final SimpMessageSendingOperations messageSendingTemplate;
    private final ChatService chatService;

    @MessageMapping("/chat/message")
    public void message(ChatMessageDto chatMessageDto) {
        Chat savedChat = chatService.saveChat(chatMessageDto);
        messageSendingTemplate.convertAndSend("/sub/chat/board/" + savedChat.getChatRoom().getBoard().getId(), savedChat.getMessage());
    }
}
