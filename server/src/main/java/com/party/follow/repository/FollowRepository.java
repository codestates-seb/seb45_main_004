package com.party.follow.repository;

import com.party.follow.entity.Follow;
import org.springframework.data.jpa.repository.JpaRepository;



public interface FollowRepository extends JpaRepository<Follow,Long> {

    //팔로우 관계 확인
    Follow findByToMember_IdAndFromMember_Id(Long toMemberId, Long fromMemberId);

    //팔로워수 조회
    Long countByToMember_Id(Long memberId);

    //팔로잉수 조회
    Long countByFromMember_Id(Long memberId);

}
