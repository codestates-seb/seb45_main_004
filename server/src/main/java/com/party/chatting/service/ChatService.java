package com.party.chatting.service;

import com.party.chatting.dto.ChatMessageDto;
import com.party.chatting.entity.Chat;
import com.party.chatting.entity.ChatRoom;
import com.party.chatting.repository.ChatRepository;
import com.party.chatting.repository.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChatService {
    private final ChatRepository chatRepository;
    private final ChatRoomRepository chatRoomRepository;

    public Chat saveChat(ChatMessageDto chatMessageDto) {
        Chat chat = new Chat();
        chat.setSender(chatMessageDto.getSender());
        chat.setMessage(chatMessageDto.getMessage());

        ChatRoom chatRoom = chatRoomRepository.findById(chatMessageDto.getChatRoomId())
                .orElseThrow(() -> new RuntimeException("ChatRoom not found"));
        chat.setChatRoom(chatRoom);

        return chatRepository.save(chat);
    }
}
