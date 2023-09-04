package com.party.follow.entity;

import com.party.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Follow {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "FOLLWER_MEMBER")
    private Member follwerMember;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "FOLLOWING_MEMBER")
    private Member followingMember;


}
