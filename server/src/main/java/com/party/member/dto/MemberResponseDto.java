package com.party.member.dto;

import lombok.Getter;
import lombok.Setter;



@Setter
@Getter
public class MemberResponseDto {
    // 추가해야 되는거 팔로우 목록
    private String nickname;
    private String email;
    private String gender;
    private String introduce;
    private String imageUrl;
}
