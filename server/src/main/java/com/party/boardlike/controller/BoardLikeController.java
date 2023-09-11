package com.party.boardlike.controller;

import com.party.boardlike.dto.BoardLikeResponseDto;
import com.party.boardlike.repository.BoardLikeRepository;
import com.party.boardlike.service.BoardLikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/likes")
public class BoardLikeController {

    private final BoardLikeService boardLikeService;
    private final BoardLikeRepository boardLikeRepository;


    //좋아요 post
    @PostMapping("/{board-id}")
    public ResponseEntity postBoardLike(@PathVariable("board-id") Long boardId) {
        BoardLikeResponseDto responseDto = boardLikeService.createBoardLike(boardId);
        return new ResponseEntity<>(responseDto, HttpStatus.CREATED);
    }

    //특정글에 대한 좋아요 수 조회
    @GetMapping("/{board-id}")
    public ResponseEntity getLikeCount(@PathVariable("board-id") Long boardId) {
        long likeCount = boardLikeRepository.countByBoardId(boardId);
        return new ResponseEntity<>(likeCount,HttpStatus.OK);
    }

    //좋아요 delete
    @DeleteMapping("/{board-id}")
    public ResponseEntity deleteBoardLike(@PathVariable("board-id") Long boardId) {
        BoardLikeResponseDto responseDto = boardLikeService.cancelBoardLike(boardId);
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }
}
