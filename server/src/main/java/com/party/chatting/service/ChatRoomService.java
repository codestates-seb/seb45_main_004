package com.party.chatting.service;

import com.party.chatting.entity.ChatRoom;
import com.party.chatting.repository.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class ChatRoomService {

    private final ChatRoomRepository chatRoomRepository;

    // boardId와 주요키가 같은 chatRoom을 생성
    public void creatChatRoom(long boardId) {
        ChatRoom chatRoom = ChatRoom.builder()
                .id(boardId)
                .build();
        chatRoomRepository.save(chatRoom);
    }
}
