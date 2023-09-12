package com.party.board.repository;

import com.party.board.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface BoardRepository extends JpaRepository<Board,Long> {

//    @Query("select board from Board board where board.id = :boardId")
    @Query("select board from Board board join fetch board.member where board.id = :boardId")
    Optional<Board> findByIdWithAll(@Param("boardId") Long boardId);

    //모임글 날짜 조회
    List<Board> findByDate(LocalDate eventDate);

    //카테고리 조회
    List<Board> findByCategory(Board.BoardCategory category);

    //좋아요 순 조회
    List<Board> findAllByOrderByBoardLikesCountDesc();

    //카테고리+좋아요 조회
    List<Board> findByCategoryOrderByBoardLikesCountDesc(Board.BoardCategory category);

    //제목으로 글 검색(전체글)
    List<Board> findByTitleContaining(String title);

    //제목+내용 글 검색(전체글) 대소문자 구분 없이 검색 가능
    List<Board> findByTitleContainingIgnoreCaseOrBodyContainingIgnoreCase(String title, String body);

    //제목으로 글 검색(카테고리)
    List<Board> findByCategoryAndTitleContaining(Board.BoardCategory category, String title);

    //제목+내용 글 검색(카테고리) 대소문자 구분 없이 검색 가능
    List<Board> findByCategoryAndTitleContainingIgnoreCaseOrCategoryAndBodyContainingIgnoreCase(Board.BoardCategory category1, String title, Board.BoardCategory category2,String body);
}
