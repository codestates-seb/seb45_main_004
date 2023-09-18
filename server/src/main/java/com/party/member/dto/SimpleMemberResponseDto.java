package com.party.member.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SimpleMemberResponseDto {
    private Long id;
    private String nickname;
    private String email;
}
