package com.party.alram.repository;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.Map;

public interface EmitterRepository {
    //emitter 저장
    SseEmitter save (String emitterId, SseEmitter sseEmitter);

    //이벤트 저장
    void saveEventCache(String emitterId, Object event);

    //memberId와 관련된 모든 emitter를 찾음
    Map<String, SseEmitter> findAllEmittersStartWithByMemberId (Long memberId);

    //memberId와 관련된 모든 이벤트를 찾음
    Map<String, Object> findAllEventCacheStartWithByMemberId (Long memberId);

    //emitter 삭제
    void deleteById(String id);

    //memberId와 관련된 모든 emitter 삭제
    void deleteAllEmitterStartWithByMemberId (Long memberId);

    //memberId와 관련된 모든 이벤트 삭제
    void deleteAllEventCacheStartWithByMemberId(Long memberId);
}
