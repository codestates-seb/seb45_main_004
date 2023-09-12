package com.party.alram.Controller;

import com.party.alram.entity.Alarm;
import com.party.alram.repository.EmitterRepository;
import com.party.alram.service.AlarmService;
import com.party.exception.BusinessLogicException;
import com.party.exception.ExceptionCode;
import com.party.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;
import java.util.Map;

/**
 * 클라에서 구독하는 요청을 보내면,
 * 컨트롤러에서 SseEmitter를 만들어주는 서비스 레이어를 통해 전달 받은 SseEmitter를 반환한다.
 */
@RestController
@RequestMapping("/members/alrams")
@RequiredArgsConstructor
public class AlarmController {
    private final AlarmService alarmService;
    private final MemberService memberService;
    private final EmitterRepository emitterRepository;


    @GetMapping
    public ResponseEntity getAlarm(){
        Long memberId = extractMemberId();
        //alarmService.getAlarms(memberId);
        //List<Alarm> alarms = alarmService.getAlarms(memberId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping(value = "/sub", produces = "text/event-stream")
    public SseEmitter subscribe(
            @RequestParam(value = "lastEventId", required = false, defaultValue = "") String lastEventId) {
        Long memberId = extractMemberId();
        return alarmService.subscribe(memberId, lastEventId);
    }

    //memberId 추출
    private Long extractMemberId() {
        Object memberIdObject  = memberService.extractMemberInfo().get("id");

        if (memberIdObject instanceof Long) {
            return (Long) memberIdObject;
        } else if (memberIdObject instanceof Integer) {
            return ((Integer) memberIdObject).longValue();
        } else {
            throw new BusinessLogicException(ExceptionCode.INVALID_MEMBER_ID);
        }
    }
}
