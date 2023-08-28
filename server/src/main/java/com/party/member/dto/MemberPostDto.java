package com.party.member.dto;

import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Getter
public class MemberPostDto {
    @Email
    @NotBlank
    private String memberEmail;

    @NotBlank
    private String memberNickname;

    @NotBlank
    private String memberGender;

    @NotBlank
    private String memberPassword;
}
