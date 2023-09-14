package com.party.member.dto;

import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Getter
public class MemberPostDto {
    @Email
    @NotBlank
    private String email;

    @NotBlank
    private String nickname;

    @NotBlank
    private String gender;

    @NotBlank
    @Pattern(regexp = "^(?=.{8,}).*$", message = "비밀번호는 8자 이상이어야 합니다.")
    private String password;
}
