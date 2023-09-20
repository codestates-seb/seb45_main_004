package com.party.chatting.service;

import com.party.board.entity.Board;
import com.party.board.repository.BoardRepository;
import com.party.chatting.entity.Chat;
import com.party.chatting.entity.ChatRoom;
import com.party.chatting.repository.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChatRoomService {
    private final ChatRoomRepository chatRoomRepository;
    private final BoardRepository boardRepository;

    public ChatRoom createChatRoom(long boardId) {
        ChatRoom chatRoom = new ChatRoom();
        Board board = boardRepository.findById(boardId)
                        .orElseThrow(() -> new RuntimeException("Not Founded"));
        chatRoom.setBoard(board);
        System.out.println(chatRoom.getBoard().getId());
        return chatRoomRepository.save(chatRoom);
    }

    public ChatRoom findChatRoom(long boardId) {
        ChatRoom chatRoom = chatRoomRepository.findByBoard_Id(boardId)
                .orElseThrow(() -> new RuntimeException("Not Founded"));
        return chatRoom;
    }
}
