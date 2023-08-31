package com.party.follow.entity;

import com.party.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.procedure.spi.ParameterRegistrationImplementor;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Follow {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "FROM_MEMBER")
    private Member fromMember;

    @ManyToOne
    @JoinColumn(name = "TO_MEMBER")
    private Member toMember;

    public Follow(Member fromMember, Member toMember) {
        this.fromMember = fromMember;
        this.toMember = toMember;
    }
}
