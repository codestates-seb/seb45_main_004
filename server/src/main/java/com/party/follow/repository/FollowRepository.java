package com.party.follow.repository;

import com.party.follow.entity.Follow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface FollowRepository extends JpaRepository<Follow,Long> {

    //팔로우 관계 확인
    Follow findByToMember_IdAndFromMember_Id(Long toMemberId, Long fromMemberId);

    //팔로워수 조회
    Long countByToMember_Id(Long memberId);

    //팔로잉수 조회
    Long countByFromMember_Id(Long memberId);

    //팔로워 목록 조회
    @Query("SELECT f FROM Follow f JOIN FETCH f.fromMember WHERE f.toMember.id = :toMemberId")
    List<Follow> findFromMember_IdsByToMember_Id(Long toMemberId);

    //팔로잉 목록 조회
    @Query("SELECT f FROM Follow f JOIN FETCH f.toMember WHERE f.fromMember.id = :fromMemberId")
    List<Follow> findToMember_IdsByFromMember_Id(Long fromMemberId);

}
