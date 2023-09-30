package com.party.chatting.controller;

import com.party.chatting.Dto.ChattingDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
public class ChatController {

    private final SimpMessageSendingOperations messagingTemplate;

    @MessageMapping("/chat/message") // '/pub' 뒤에 붙여야하는 주소
    public void message(@RequestBody ChattingDto chattingDto) {
        log.info("채팅방 번호: " + chattingDto.getRoomId());
        log.info("채팅방 시간: " + chattingDto.getDate());
        messagingTemplate.convertAndSend("/sub/chat/room/" + chattingDto.getRoomId(), chattingDto.getMessage());
    }
}
