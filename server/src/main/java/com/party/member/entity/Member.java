package com.party.member.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.party.board.entity.Applicant;
import com.party.board.entity.Board;
import com.party.boardlike.entity.BoardLike;
import com.party.follow.entity.Follow;
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
    private Long id;

    @Email
    @Column(unique = true)
    private String email;

    @Column(unique = true)
    private String nickname;

    @Column()
    private String gender;

    @Column()
    private String password;

    private String introduce;

    private String imageUrl;

    private int followerCount;

    private int followingCount;

    @OneToMany(mappedBy = "member",cascade = CascadeType.REMOVE)
    @JsonManagedReference
    private List<Applicant> applicants = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    private List<BoardLike> boardLikes = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    private List<Follow> follows;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();
}
