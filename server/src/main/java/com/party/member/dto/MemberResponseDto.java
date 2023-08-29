package com.party.member.dto;

import com.party.image.entity.ProfileImage;
import com.party.member.entity.MemberCard;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
public class MemberResponseDto {
    // 추가해야 되는거 팔로우 목록
    private String memberNickname;
    private String memberEmail;
    private String memberGender;
    private String memberIntroduce;
    private ProfileImage profileImage;
    private List<MemberCardResponseDto> memberCards = new ArrayList<>();
}
