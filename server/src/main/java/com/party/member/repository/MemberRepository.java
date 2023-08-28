package com.party.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.party.member.entity.Member;

public interface MemberRepository extends JpaRepository<Member, Long> {
}
