package com.party.chatting.controller;

import com.party.chatting.service.ChatRoomService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/chatroom")
@Slf4j
public class ChatRoomController {

    private final ChatRoomService chatRoomService;

    @PostMapping("/{board-id}")
    public ResponseEntity<String> creatChatRoom(@PathVariable("board-id") long boardId) {
        log.info("받아온 boardId: " + boardId);
        chatRoomService.creatChatRoom(boardId);
        return new ResponseEntity<>("ChatRoom created", HttpStatus.CREATED);
    }
}
