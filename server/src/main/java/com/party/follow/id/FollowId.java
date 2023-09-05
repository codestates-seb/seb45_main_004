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

    @Column(name = "from_member")
    private Long fromMember;

    @Column(name = "to_member")
    private Long toMember;

    public FollowId(Long fromMember, Long toMember) {
        this.fromMember = fromMember;
        this.toMember = toMember;
    }
}
