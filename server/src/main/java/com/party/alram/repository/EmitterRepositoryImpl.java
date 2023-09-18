package com.party.alram.repository;

import lombok.NoArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Repository
@NoArgsConstructor
public class EmitterRepositoryImpl implements EmitterRepository{
    private final Map<String, SseEmitter>emitters = new ConcurrentHashMap<>();
    private final Map<String, Object> eventCache = new ConcurrentHashMap<>();

    @Override
    public SseEmitter save (String emitterId, SseEmitter sseEmitter) {
        emitters.put(emitterId, sseEmitter);
        return sseEmitter;
    }

    @Override
    public void saveEventCache(String eventCacheId, Object event) {
        eventCache.put(eventCacheId,event);
    }

    @Override
    public Map<String, SseEmitter> findAllEmittersStartWithByMemberId(Long memberId) {
        return emitters.entrySet().stream()
                .filter(entry -> entry.getKey().startsWith(String.valueOf(memberId)))
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
    }

    @Override
    public Map<String, Object> findAllEventCacheStartWithByMemberId(Long memberId) {
        return eventCache.entrySet().stream()
                .filter(entry -> entry.getKey().startsWith(String.valueOf(memberId)))
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
    }

    @Override
    public void deleteById(String id) {
        emitters.remove(id);

    }

    @Override
    public void deleteAllEmitterStartWithByMemberId(Long memberId) {
        emitters.forEach((key, emitter) -> {
            if (key.startsWith(String.valueOf(memberId))) {
                emitters.remove(key);
            }
        });
    }

    @Override
    public void deleteAllEventCacheStartWithByMemberId(Long memberId) {
        eventCache.forEach((key, emitter) -> {
            if (key.startsWith(String.valueOf(memberId))){
                eventCache.remove(key);
            }
        });
    }
}

