package com.party.board.repository;

import com.party.board.entity.Applicant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApplicantRepository extends JpaRepository<Applicant, Long> {
    //내가 참여한 모임 조회
    List<Applicant> findByMemberId(Long memberId);

    //모임에 참여한 멤버 조회
    List<Applicant> findByBoardId(Long boardId);

    //참여했는지 조회
    boolean existsByBoardIdAndMemberId(Long boardId, Long memberId);




}
