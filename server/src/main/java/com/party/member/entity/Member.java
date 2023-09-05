package com.party.member.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.party.board.entity.Applicant;
import com.party.board.entity.Board;
import com.party.boardlike.entity.BoardLike;
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

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    @JsonManagedReference
    private List<Board> boards = new ArrayList<>();

    @OneToMany(mappedBy = "member",cascade = CascadeType.REMOVE)
    private List<Applicant> applicants = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    private List<BoardLike> boardLikes = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    public static Member createMember(String email, String password, String nickname) {
        return Member.builder()
                .email(email)
                .password(password)
                .nickname(nickname)
                .roles(List.of("USER"))
                .build();
    }
}
