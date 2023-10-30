package com.party.chatting.service;

import com.party.chatting.dto.ChattingDto;
import com.party.chatting.entity.ChatRoom;
import com.party.chatting.entity.Chatting;
import com.party.chatting.mapper.ChattingMapper;
import com.party.chatting.repository.ChatRoomRepository;
import com.party.chatting.repository.ChattingRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class ChattingService {

    private final ChattingMapper mapper;
    private final ChattingRepository chattingRepository;
    private final ChatRoomRepository chatRoomRepository;
    public void saveChat(ChattingDto chattingDto) {
        log.info("전달 받은 ChattingDto roomId: " + chattingDto.getRoomId());
        log.info("전달 받은 ChattingDto Message: " + chattingDto.getMessage());
        ChatRoom chatRoom = chatRoomRepository.findByRoomId(chattingDto.getRoomId())
                .orElseThrow(() -> new RuntimeException("ChatRoom not found"));

        Chatting chatting = mapper.ChattingDtoToChatting(chattingDto);

        chatting.assignChatRoom(chatRoom);

        chattingRepository.save(chatting);

        log.info("저장된 Chatting Entity roomId: " + chatting.getRoomId());
        log.info("저장된 Chatting Entity Message: " + chatting.getMessage());
    }
}
