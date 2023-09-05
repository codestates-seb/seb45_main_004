package com.party.follow.repository;

import com.party.follow.entity.Follow;
import com.party.follow.id.FollowId;
import com.party.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FollowRepository extends JpaRepository<Follow, FollowId> {

    //내가 몇명을 팔로우 하는지
    Long countByFollowId_Follower(Long memberId);

    //나를 몇명이 팔로우 하는지
    Long countByFollowId_Following(Long memberId);

    //내가 팔로우한 계정 목록
    @Query("SELECT m FROM Member m INNER JOIN Follow f ON f.followId.following = m WHERE f.followId.follower.id = :memberId")
    List<Member> findAllByFollower(@Param("memberId") Long memberId);

    //나를 팔로우한 계정 목록
    @Query("SELECT m FROM Member m INNER JOIN Follow f ON f.followId.follower = m WHERE f.followId.following.id = :memberId")
    List<Member> findAllByFollowing(@Param("memberId") Long memberId);

    void deleteAllByFollowId_Follower(Long memberId);

    void deleteAllByFollowId_Following(Long memberId);


}
