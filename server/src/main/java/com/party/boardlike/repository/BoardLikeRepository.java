package com.party.boardlike.repository;

import com.party.boardlike.entity.BoardLike;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface BoardLikeRepository extends JpaRepository<BoardLike, Long> {

    //특정 게시물,특정 회원의 좋아요 조회
    List<BoardLike> findByBoard_idAndMember_id(Long boardId, Long memberId);

    //특정 게시물에 대한 좋아요 개수
    long countByBoard_id(Long boardId);

    //특정 게시물에 특정 회원의 좋아요 여부 확인
    boolean existsByBoard_idAndMember_id(Long boardId, Long memberId);

}
