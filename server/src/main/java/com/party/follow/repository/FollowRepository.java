package com.party.follow.repository;

import com.party.follow.entity.Follow;
import com.party.follow.id.FollowId;
import com.party.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface FollowRepository extends JpaRepository<Follow, FollowId> {

    Follow findById_ToMemberAndId_FromMember(Long toMemberId, Long fromMemberId);

    //나를 몇명이 팔로우 하는지
    Long countById_ToMember(Long memberId);

    //내가 몇명을 팔로우 하는지
    Long countById_FromMember(Long memberId);

    //내가 팔로우한 계정 목록
    @Query("SELECT m FROM Member m INNER JOIN Follow f ON f.id.toMember = m.id WHERE f.id.fromMember = :memberId")
    List<Member> findAllByFromMember(@Param("memberId") Long memberId);

    //나를 팔로우한 계정 목록
    @Query("SELECT m FROM Member m INNER JOIN Follow f ON f.id.toMember = m.id WHERE f.id.fromMember = :memberId")
    List<Member> findAllByToMember(@Param("memberId") Long memberId);

    void deleteAllById_ToMember(Long memberId);

    void deleteAllById_FromMember(Long memberId);
}
