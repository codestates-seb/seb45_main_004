package com.party.chatting.controller;

import com.party.board.repository.BoardRepository;
import com.party.chatting.dto.ChatRoomDto;
import com.party.chatting.entity.ChatRoom;
import com.party.chatting.mapper.ChatMapper;
import com.party.chatting.repository.ChatRoomRepository;
import com.party.chatting.service.ChatRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/chat")
public class ChatRoomController {
    private final ChatRoomService chatRoomService;

    @PostMapping("/room/{boardId}")
    public void creatChatRoom(@PathVariable("boardId") long boardId) {
        chatRoomService.createChatRoom(boardId);
    }

    @GetMapping("/room/{boardId}")
    public ResponseEntity getChatRoom(@PathVariable("boardId") long boardId) {
        ChatRoom chatRoom = chatRoomService.findChatRoom(boardId);
        return new ResponseEntity(chatRoom, HttpStatus.OK);
    }
}
