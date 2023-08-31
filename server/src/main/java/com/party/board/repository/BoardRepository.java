package com.party.board.repository;

import com.party.board.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface BoardRepository extends JpaRepository<Board,Long> {

    @Query("select board from Board board where board.id = :boardId")
    Optional<Board> findByIdWithAll(@Param("boardId") Long boardId);


}
