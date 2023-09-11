package com.party.member.repository;

import com.party.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByEmail(String email);
//    @Modifying
//    @Query("update Member m set m.refreshToken = :refreshToken where m.id = :id")
//    void updateRefreshToken(@Param("id") Long id, @Param("refreshToken") String refreshToken);
    void deleteByEmail(String email);
}
