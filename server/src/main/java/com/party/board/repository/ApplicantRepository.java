package com.party.board.repository;

import com.party.board.entity.Applicant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ApplicantRepository extends JpaRepository<Applicant, Long> {
    //내가 참여한 모임 조회
    List<Applicant> findByMemberId(Long memberId);

    //모임에 참여한 멤버 조회
    List<Applicant> findByBoardId(Long boardId);

    //참여했는지 조회
    boolean existsByBoardIdAndMemberId(Long boardId, Long memberId);

    //모임 참여자 이메일 조회
    @Query("SELECT DISTINCT a.member.email FROM Applicant a LEFT JOIN a.member WHERE a.board.id = :boardId AND a.isJoin = true")
    List<String> findEmailsByBoardId(@Param("boardId") Long boardId);

}
