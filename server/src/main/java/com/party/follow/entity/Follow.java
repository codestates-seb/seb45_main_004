package com.party.follow.entity;

import com.party.follow.id.FollowId;
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

    @EmbeddedId
    private FollowId id;

    public Follow(Long follower,Long following ) {
        this.id = new FollowId(follower, following);
    }
}
