package com.party.image.entity;

import com.party.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class ProfileImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ProfileImage;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;
}
