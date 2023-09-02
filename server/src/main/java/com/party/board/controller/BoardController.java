package com.party.board.controller;

import com.party.board.dto.BoardDto;
import com.party.board.entity.Board;
import com.party.board.mapper.BoardMapper;
import com.party.board.service.BoardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/boards")
@RequiredArgsConstructor
@Validated
public class BoardController {

    private final BoardService boardService;
    private final BoardMapper mapper;


    // 모임글 등록
    @PostMapping("/new-boards")
    public ResponseEntity postBoard(@Valid @RequestBody BoardDto.Post postDto) {

        Board createBoard = boardService.createBoard(postDto);
        BoardDto.ResponsePost responsePostDto = new BoardDto.ResponsePost(createBoard);

        return new ResponseEntity<>(responsePostDto,HttpStatus.CREATED);
    }

    //모임글 상세 조회
    @GetMapping("{board-id}")
    public ResponseEntity getBoard(@PathVariable("board-id") long boardId){
        Board board = boardService.findBoard(boardId);
        return new ResponseEntity<>(mapper.boardToBoardResponse(board),HttpStatus.OK);
    }

    //모임글 전체 조회(최신순)
    @GetMapping
    public ResponseEntity getBoards() {
        List<Board> boards = boardService.findBoards();
        return new ResponseEntity<>(mapper.boardsToBoardResponse(boards), HttpStatus.OK);
    }

    //모임글 전체 조회(좋아요순)
    @GetMapping("/likes")
    public ResponseEntity getBoardsSortedByLikesCount() {
        List<Board> boards = boardService.findBoardsByLikesCountDesc();
        return new ResponseEntity(mapper.boardsToBoardResponse(boards), HttpStatus.OK);
    }

    //특정 카테고리별 조회(최신순)
    @GetMapping("/category/{categoryCode}")
    public ResponseEntity getBoardsByCategory(@PathVariable("categoryCode") int categoryCode) {

        Optional<Board.BoardCategory> selectedCategory = Arrays.stream(Board.BoardCategory.values())
                .filter(category -> category.getCategoryCode() == categoryCode)
                .findFirst();

        if (selectedCategory.isPresent()) {
            List<Board> boards = boardService.findBoardsByCategory(selectedCategory.get());
            return new ResponseEntity<>(mapper.boardsToBoardResponse(boards), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(("This categoryCode does not exist"),HttpStatus.BAD_REQUEST);
        }
    }
    //특정 카테고리별 조회(좋아요순)
    @GetMapping("/category/{categoryCode}/likes")
    public ResponseEntity getBoardsByCategorySortedByLikesCount(@PathVariable("categoryCode") int categoryCode){
        Optional<Board.BoardCategory> selectedCategory = Arrays.stream(Board.BoardCategory.values())
                .filter(category -> category.getCategoryCode() == categoryCode)
                .findFirst();

        if (selectedCategory.isPresent()) {
            List<Board> boards = boardService.findByCategoryAndOrderByLikesDesc(selectedCategory.get());
            return new ResponseEntity<>(mapper.boardsToBoardResponse(boards), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(("This categoryCode does not exist"),HttpStatus.BAD_REQUEST);
        }
    }
}
