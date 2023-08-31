package com.party.boardlike.repository;

import com.party.board.entity.Board;
import com.party.boardlike.entity.BoardLike;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface BoardLikeRepository extends JpaRepository<BoardLike, Long> {

    List<BoardLike> findByBoard_idAndMember_id(Long boardId, Long memberId);

    long countByBoard_id(Long boardId);

    long countByBoard(Board board);

    boolean existsByBoard_idAndMember_id(Long boardId, Long memberId);

//    List<BoardLike> findByMember_idAndIsLikedTrue(Long memberId);

}
