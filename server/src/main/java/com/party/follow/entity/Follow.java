package com.party.follow.entity;

import com.party.follow.id.FollowId;
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

    public Follow(Long toMember,Long fromMember ) {
        this.id = new FollowId(toMember, fromMember);
    }
}
