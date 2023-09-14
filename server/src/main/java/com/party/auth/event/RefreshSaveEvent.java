package com.party.auth.event;

import com.party.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RefreshSaveEvent {
    private Member member;
    private String refreshToken;
}
