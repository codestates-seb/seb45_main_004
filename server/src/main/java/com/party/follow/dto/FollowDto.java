package com.party.follow.dto;

import com.party.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class FollowDto {

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Member {
        private Long memberId;
        private String nickname;
        private String introduce;
        private String imageUrl;
    }
}
