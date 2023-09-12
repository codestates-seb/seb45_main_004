package com.party.auth.event;

import com.party.member.entity.Member;
import com.party.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@Slf4j
@EnableAsync
@Transactional
@RequiredArgsConstructor
public class RefreshSaveEventListener {
    private final MemberRepository memberRepository;

    @Async
    @EventListener
    public void handleRefreshSaveEvent(RefreshSaveEvent event) {
        Member member = event.getMember();
        String rft = event.getRefreshToken();
        log.info("memberrepository 활성여부" + memberRepository);
        System.out.println("여긴 이벤트 리스너 rft 값" + rft);
        System.out.println("여긴 이벤트 리스너 member id" + member.getId().toString());
        memberRepository.updateRefreshToken(member.getId(), rft);
    }
}
