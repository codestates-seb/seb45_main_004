package com.party.follow.id;


import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@Getter
@NoArgsConstructor
@EqualsAndHashCode
public class FollowId implements Serializable {


    @Column(name = "follower_id")
    private Long follower;

    @Column(name = "following_id")
    private Long following;

    public FollowId(Long follower, Long following) {
        this.follower = follower;
        this.following = following;
    }
}
