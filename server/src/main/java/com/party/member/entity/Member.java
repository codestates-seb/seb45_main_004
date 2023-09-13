package com.party.member.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.party.alram.entity.Alarm;
import com.party.board.entity.Applicant;
import com.party.board.entity.Board;
import com.party.boardlike.entity.BoardLike;
import com.party.follow.entity.Follow;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Email;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Builder
@AllArgsConstructor
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Email
    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false, unique = true)
    private String nickname;

    private String gender;

    @Column(nullable = false)
    private String password;

    private String introduce;

    private String imageUrl;

    // 작성하다 보니까 필요가 없어졌음
    private String refreshToken;

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    @JsonManagedReference
    private List<Applicant> applicants = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    private List<BoardLike> boardLikes = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Board> boards = new ArrayList<>();

    // 팔로잉
    @OneToMany(mappedBy = "fromMember", cascade = CascadeType.ALL)
    private List<Follow> fromMembers = new ArrayList<>();

    // 팔로우
    @OneToMany(mappedBy = "toMember", cascade = CascadeType.ALL)
    private List<Follow> toMembers = new ArrayList<>();

    @OneToMany(mappedBy = "member",cascade = CascadeType.REMOVE)
    @JsonManagedReference
    private List<Alarm> alarms = new ArrayList<>();

    public static Member createMember(String email, String password, String nickname, String gender) {

        return Member.builder()
                .email(email)
                .password(password)
                .nickname(nickname)
                .gender(gender)
                .introduce("기본 소개글")
                .roles(List.of("USER"))
                .build();
    }
}
