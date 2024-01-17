package com.party.chatting.config.handler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;

@Slf4j
@RequiredArgsConstructor
@Component
public class StompHandler implements ChannelInterceptor {
    /*
    preSend()는 클라이언트로 전송되는 모든 채팅을 훑어보게 된다고 함
    -> 그래서 그냥 보안토큰 검사 로그 XSS 방지를 위한 필터링 등을 넣는다고 함.
     */
    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        return ChannelInterceptor.super.preSend(message, channel);
    }
}
