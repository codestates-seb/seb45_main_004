package com.party.board.repository;

import com.party.board.entity.Applicant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ApplicantRepository extends JpaRepository<Applicant, Long> {
    //내가 참여한 모임 조회
    List<Applicant> findByMemberId(Long memberId);

    //참여했는지 조회
    boolean existsByBoardIdAndMemberId(Long boardId, Long memberId);




}
