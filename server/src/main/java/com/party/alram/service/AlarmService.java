package com.party.alram.service;

import com.party.alram.NotificationEvent;
import com.party.alram.entity.Alarm;
import com.party.alram.repository.AlarmRepository;
import com.party.alram.repository.EmitterRepository;
import com.party.board.entity.Board;
import com.party.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.List;
import java.util.Map;

/**
 * 클라이언트에서 SSE 연결 요청을 보낸다.
 * 서버에서는 클라이언트와 매핑되는 SSE 통신 객체를 만든다.
 * 서버에서 이벤트가 발생하면 해당 객체를 통해 클라이언트로 데이터를 전달한다.
 */
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
        String id = makeTimeIncludedId(memberId);
        SseEmitter emitter = emitterRepository.save(id, new SseEmitter(DEFAULT_TIMEOUT));
        //emitter 가 완료될 때 emitter를 삭제 (모든 데이터가 성공적으로 전송된 상태)
        emitter.onCompletion(() -> emitterRepository.deleteById(id));
        //emitter 가 타임아웃되었으면 emitter 삭제 (지정된 시간동안 어떤 이벤트도 전송 x)
        emitter.onTimeout(() -> emitterRepository.deleteById(id));

       //503 에러 방지하고자 더미 이벤트 전달
        sendToClient(emitter, id, "EventStream Created. [memberId=" + memberId + "]");

        //클라가 미수신한 event가 존재할 경우 전송 (유실 방지)
        if (hasLostData(lastEventId)){
            sendLostdata(lastEventId, memberId, emitter);
        }

        return emitter;
    }

    /**
     * 알림 생성, 전송 메서드
     * 사용자의 모든 알람을 읽음처리
     */
    @Async
//    @Transactional
    public void sendAlarm(Member member, Board board, Alarm.AlarmStatus alarmStatus, String content){
        Alarm alarm = Alarm.create(member, board, alarmStatus,content);
        alarmRepository.save(alarm);

        Map<String, SseEmitter> sseEmitters = emitterRepository.findAllEmittersStartWithByMemberId(member.getId());
        String eventId = makeTimeIncludedId(member.getId());
        System.out.println(eventId);

        sseEmitters.forEach((key, emitter) -> {
            //데이터 캐시 저장 (유실 데이터 처리를 위해)
            emitterRepository.saveEventCache(key,alarm);
            //데이터 전송
            sendToClient(emitter,eventId, content);
        });
    }


    //모임 글 작성자에게 알림 전송
    public void sendBoardCreatedNotification(Member member, Board board){
        sendAlarm(member,board,Alarm.AlarmStatus.BOARD_CREATED,"["+board.getTitle()+"] 모임이 등록되었습니다!🔥");
    }


    //모임 참여자 발생 시 참여 중인 모든 인원에게 알림 전송
    public void sendParticipantsNotification(Board board){
        sendAlarm(board.getMember(), board, Alarm.AlarmStatus.BOARD_UPDATE, "["+board.getTitle()+"] 모임에 새로운 인연이 모임에 찾아왔어요 💝");
    }

    //모임 참여 완료 알림 전송 (모임 참여 신청자에게 전송)
    public void sendApplicantNotification(Member member, Board board){
        sendAlarm(member,board, Alarm.AlarmStatus.BOARD_UPDATE,"["+board.getTitle()+"] 모임에 참여 완료되었습니다! 💞");
    }

    //모임 모집 마감 알림 전송
    public void sendCompletedNotification (Board board){
        sendAlarm(board.getMember(), board, Alarm.AlarmStatus.BOARD_CLOSED, "["+board.getTitle()+"] 모임이 모집 마감되었습니다 💖");
    }

    /**
     * 클라에 데이터 전송 (id -> 데이터를 전달받을 사용자의 id)
     */
    @Async
    private void sendToClient(SseEmitter emitter, String eventId, Object data) {
        try {
            emitter.send(SseEmitter.event()
                    .id(eventId).data(data));
        }catch (IOException exception){
            emitterRepository.deleteById(eventId);
            throw new RuntimeException("연결오류");
        }
    }


   public List<Alarm> getAlarms (Long memberId){
        return alarmRepository.findAlarmByMember_Id(memberId);
   }

    //알림 모두 삭제
    @Transactional
    public void deleteAllAlarm (Long memberId) {
        alarmRepository.deleteAllByMember_Id(memberId);
    }


     private String makeTimeIncludedId(Long memberId){
        return memberId+"_"+ System.currentTimeMillis();
     }

     private boolean hasLostData(String lastEventId){
        return !lastEventId.isEmpty();
     }

     private void sendLostdata(String lastEventId, Long memberId, SseEmitter emitter){
    Map<String, Object> eventCaches = emitterRepository.findAllEventCacheStartWithByMemberId(memberId);
       eventCaches.entrySet().stream()
            .filter(entry -> lastEventId.compareTo(entry.getKey())<0)
            .forEach(entry -> sendToClient(emitter, entry.getKey(), entry.getValue()));
    }

}
