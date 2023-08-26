package com.party.member.entity;

import com.party.image.entity.ProfileImage;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Email;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Email
    private String memberEmail;

    private String memberNickname;

    private String memberGender;

    private String memberPassword;

    @OneToMany(mappedBy = "member",cascade = CascadeType.REMOVE)
    private List<MemberCard> memberCards = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    private List<ProfileImage> profileImages = new ArrayList<>();

    /*
    role 구현
     */

}
