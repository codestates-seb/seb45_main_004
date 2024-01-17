package com.party.chatting.controller;

import com.party.chatting.dto.ChattingDto;
import com.party.chatting.service.ChattingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
public class ChatController {

    private final SimpMessageSendingOperations messagingTemplate;
    private final ChattingService chattingService;

    @MessageMapping("/chat/message") // '/pub' 뒤에 붙여야하는 주소
    // @RequestBody 는 RESTful HTTP 요청에서 사용되고 @Payload 가 메시지 기반 어플리케이션에서 사용된다고 함
    public void message(@Payload ChattingDto chattingDto) {
        log.info("채팅방 번호: " + chattingDto.getRoomId());
        log.info("채팅방 시간: " + chattingDto.getDate());
        chattingService.saveChat(chattingDto);
        messagingTemplate.convertAndSend("/sub/chat/room/" + chattingDto.getRoomId(), chattingDto.getMessage());
    }

    /*
    채팅방을 처음 sub 할 때 여기에 메시지를 보내도록 요청
    요청이 들어오면 해당 유저에게만 이전 채팅기록을 보내고
    요청 받을때 들어온 principal을 확인해서 누가 들어왔는지
    sub 한 채팅방에 입장 문구를 썼으면 좋겠음
     */
    @MessageMapping("/chat/join")
    public void joinNewRoom(@Payload ChattingDto chattingDto) {
        log.info("채팅방 번호: " + chattingDto.getRoomId());
        log.info("채팅방 시간: " + chattingDto.getDate());
        log.info("입장한 사람: " + chattingDto.getSender());

        /*
        chattinDto 에 들어온 roomId 에 해당하는 채팅을 보내주면 됨
        Db 에서 가져오는거니까 Service 계층에서 가져와야함
         */

        messagingTemplate.convertAndSend("sub/chat/room" + chattingDto.getRoomId(),
                chattingDto.getSender() + " 님이 입장하셨습니다.");
    }

    /*
    이전 채팅내역을 스크롤 했을 때 계속 요청 올 수 있음
    그럴 때를 위한 메서드 만들어야함 이전 채팅내역을 page로 받아올건데
    클라이언트에서 요청이 올 때 마다 보내줄 수 있도록
     */
}
