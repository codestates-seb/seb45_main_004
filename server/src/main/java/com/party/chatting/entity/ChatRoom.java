package com.party.chatting.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatRoom {
    @Id
    /*
    boardId랑 chatRoomId랑 맞춰야 해서 자동생성 하지 않을 것
    cascade로 board 지우면 chatroom도 지워지게 할거임
     */
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private Long roomId;

    @OneToMany(mappedBy = "chatRoom")
    private List<Chatting> chatting;
}
