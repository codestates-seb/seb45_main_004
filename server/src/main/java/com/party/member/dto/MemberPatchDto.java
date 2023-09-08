package com.party.member.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberPatchDto {
    private int id;
    private String email;
    private String introduce;
    private String imageUrl;

}
