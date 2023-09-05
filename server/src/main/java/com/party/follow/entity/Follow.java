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
    private FollowId followId;

    public Follow(Member follow,Member following ) {
        this.followId = new FollowId(follow, following);
    }
}
