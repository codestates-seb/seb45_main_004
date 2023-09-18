package com.party.member.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Pattern;

@Getter
@Setter
public class MemberPatchDto {
    @Pattern(regexp = "^.{1,20}$", message = "소개글은 20자 이내로 입력해주세요.")
    private String introduce;
    private String imageUrl;

}
