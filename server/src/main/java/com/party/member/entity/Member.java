package com.party.member.entity;

//import com.party.board.entity.Card;
//import com.party.cardlike.entity.CardLike;
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
    @Column(nullable = false, unique = true)
    private String memberEmail;

    @Column(nullable = false, unique = true)
    private String memberNickname;

    @Column(nullable = false)
    private String memberGender;

    @Column(nullable = false)
    private String memberPassword;

    private String memberIntroduce;

//    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
//    private List<Card> cardList = new ArrayList<>();

    @OneToMany(mappedBy = "member",cascade = CascadeType.REMOVE)
    private List<MemberCard> memberCards = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    private List<ProfileImage> profileImages = new ArrayList<>();

//    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
//    private List<CardLike> cardLikes = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();
}
