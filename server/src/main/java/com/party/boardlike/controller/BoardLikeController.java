package com.party.boardlike.controller;

import com.party.boardlike.dto.BoardLikeDto;
import com.party.boardlike.dto.BoardLikeResponseDto;
import com.party.boardlike.repository.BoardLikeRepository;
import com.party.boardlike.service.BoardLikeService;
import com.party.member.service.MemberService;
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
    private final MemberService memberService;


    //좋아요 post
//        @PostMapping("/{board-id}")
//        public ResponseEntity postBoardLike(@PathVariable("board-id") Long boardId,
//                                           @RequestBody BoardLikeDto.Post postDto) {
//
//            boolean isLiked = postDto.isLiked();
//            Long memberId = extractMemberId();
//
//            boardLikeService.createBoardLike(boardId,isLiked);
//
//            long likeCount = boardLikeService.getBoardLikesCount(boardId);
//            boolean updateIsLiked = boardLikeRepository.existsByBoard_BoardIdAndMember_MemberId(boardId, memberId);
//            BoardLikeResponseDto responseDto = new BoardLikeResponseDto(likeCount, updateIsLiked);
//
//            return new ResponseEntity<>(responseDto, HttpStatus.CREATED);
//        }

    // 특정글에 대한 좋아요 수 조회
    @GetMapping("/{board-id}")
    public ResponseEntity getLikeCount(@PathVariable("board-id") Long boardId) {
        long likeCount = boardLikeService.getBoardLikesCount(boardId);
        return new ResponseEntity<>(likeCount,HttpStatus.OK);
    }

    // 좋아요 delete
//    @DeleteMapping("/{board-id}")
//    public ResponseEntity deleteBoardLike(@PathVariable("board-id") Long boardId) {
//        boardLikeService.cancelBoardLike(boardId);
//
//        Long memberId = extractMemberId();
//        long likeCount = boardIdLikeRepository.countByBoard_BoardId(boardId);
//        boolean isLiked = boardIdLikeRepository.existsByBoard_BoardIdAndMember_MemberId(boardId, memberId);
//
//        BoardLikeResponseDto responseDto = new BoardLikeResponseDto(likeCount, isLiked);
//        return new ResponseEntity<>(responseDto, HttpStatus.OK);
//    }

    /* 멤버 주석

    //memberId 추출
    private Long extractMemberId() {
        Object memberIdObject  = memberService.extractMemberInfo().get("memberId");

        if (memberIdObject instanceof Long) {
            return (Long) memberIdObject;
        } else if (memberIdObject instanceof Integer) {
             return ((Integer) memberIdObject).longValue();
        } else {
            throw new BusinessLogicException(ExceptionCode.INVALID_MEMBER_ID);
        }
    }

     */
}
