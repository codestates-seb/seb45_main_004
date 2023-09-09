package com.party.boardlike.repository;

import com.party.boardlike.entity.BoardLike;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface BoardLikeRepository extends JpaRepository<BoardLike, Long> {

    //특정 게시물에 대한 좋아요 개수
    long countByBoardId(Long boardId);

    //특정 게시물에 특정 회원의 좋아요 여부 확인
    boolean existsByBoardIdAndMemberId(Long boardId, Long memberId);

    //특정 게시물과 특정 회원에 대한 좋아요 삭제
    void deleteByBoardIdAndMemberId(Long boardId, Long memberId);

    List<BoardLike> findByMemberId(Long memberId);

}
