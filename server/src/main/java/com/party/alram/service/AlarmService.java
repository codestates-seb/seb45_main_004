package com.party.alram.service;

import com.party.alram.dto.AlarmResponse;
import com.party.alram.repository.AlarmRepository;
import com.party.alram.repository.EmitterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AlarmService {
    //기본 타임아웃 설정
    private static final Long DEFAULT_TIMEOUT = 60L * 1000 * 60;

    private final EmitterRepository emitterRepository;
    private final AlarmRepository alarmRepository;

    /**
     * 클라가 구독을 위해 호출하는 메서드
     */
    public SseEmitter subscribe(Long memberId, String lastEventId) {
        String emitterId = makeTimeIncludedId(memberId);
        SseEmitter emitter = emitterRepository.save(emitterId, new SseEmitter(DEFAULT_TIMEOUT));
        //emitter 가 완료될 때 emitter를 삭제 (모든 데이터가 성공적으로 전송된 상태)
        emitter.onCompletion(() -> emitterRepository.deleteById(emitterId));
        //emitter 가 타임아웃되었으면 emitter 삭제 (지정된 시간동안 어떤 이벤트도 전송 x)
        emitter.onTimeout(() -> emitterRepository.deleteById(emitterId));

       //503 에러 방지하고자 더미 이벤트 전달
        String eventId = makeTimeIncludedId(memberId);
        sendToClient(emitter, eventId, emitterId, "EventStream Created. [memberId=" + memberId + "]");

        //클라가 미수신한 event가 존재할 경우 전송 (유실 방지)
        if (hasLostData(lastEventId)){
            sendLostdata(lastEventId, memberId, emitterId, emitter);
        }

        return emitter;
    }

    /**
     * 클라에 데이터 전송 (id -> 데이터를 전달받을 사용자의 id)
     */
    private void sendToClient(SseEmitter emitter, String eventId, String emitterId, Object data) {
        try {
            emitter.send(SseEmitter.event()
                    .id(eventId).data(data));
        }catch (IOException exception){
            emitterRepository.deleteById(emitterId);
        }
    }

   public List<AlarmResponse> getAlarms (Long memberId){
        List<AlarmResponse> alarmList = alarmRepository.findAllById(memberId);
        return alarmList;
   }

    //알림 삭제
    public void deleteAlarmById(Long alarmId){
      alarmRepository.deleteById(alarmId);
    }

    //알림 모두 삭제
    public void deleteAllAlarm (Long memberId){
        alarmRepository.deleteAllById(memberId);
    }


     private String makeTimeIncludedId(Long memberId){
        return memberId+"_"+ System.currentTimeMillis();
     }

     private boolean hasLostData(String lastEventId){
        return !lastEventId.isEmpty();
     }

     private void sendLostdata(String lastEventId, Long memberId, String emitterId, SseEmitter emitter){
    Map<String, Object> eventCaches = emitterRepository.findAllEventCacheStartWithByMemberId(memberId);
       eventCaches.entrySet().stream()
            .filter(entry -> lastEventId.compareTo(entry.getKey())<0)
            .forEach(entry -> sendToClient(emitter, entry.getKey(), emitterId, entry.getValue()));
    }

}
