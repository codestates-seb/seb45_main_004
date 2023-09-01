package com.party.boardlike.service;

import com.party.board.entity.Board;
import com.party.board.repository.BoardRepository;
import com.party.boardlike.dto.BoardLikeResponseDto;
import com.party.boardlike.entity.BoardLike;
import com.party.boardlike.repository.BoardLikeRepository;
import com.party.exception.BusinessLogicException;
import com.party.exception.ExceptionCode;
import com.party.member.repository.MemberRepository;
import com.party.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class BoardLikeService {

    private final BoardLikeRepository boardLikeRepository;
    private final BoardRepository boardRepository;
    private final MemberRepository memberRepository;
    private final MemberService memberService;


    public boolean isBoardLikedByMember(Long boardId, Long memberId) {
        return boardLikeRepository.existsByBoard_idAndMember_id(boardId, memberId);
    }

    public long getBoardLikesCount(Long boardId) {
        return boardLikeRepository.countByBoard_id(boardId);
    }

    // 좋아요 생성
    public ResponseEntity<BoardLikeResponseDto> createBoardLike(Long boardId, boolean isLiked) {
        Long memberId = extractMemberId();

        if (isBoardLikedByMember(boardId, memberId)) {
            throw new IllegalArgumentException("YOU ALREADY LIKED");
        }

        createBoardLikeEntry(boardId, memberId, true);
        long likeCount = getBoardLikesCount(boardId);
        BoardLikeResponseDto responseDto = new BoardLikeResponseDto(likeCount);

        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    //좋아요 취소
    public ResponseEntity<BoardLikeResponseDto> cancelBoardLike(Long boardId) {
        Long memberId = extractMemberId();

        List<BoardLike> boardLikes = boardLikeRepository.findByBoard_idAndMember_id(boardId, memberId);
        if (!boardLikes.isEmpty()) {
            BoardLike boardLike = boardLikes.get(0);
            boardLikeRepository.delete(boardLike);

            updateBoardLikeCount(boardId);

            long likeCount = getBoardLikesCount(boardId);
            BoardLikeResponseDto responseDto = new BoardLikeResponseDto(likeCount);

            return new ResponseEntity<>(responseDto, HttpStatus.OK);
        } else {
            throw new IllegalArgumentException("Like Does Not Exist");
        }
    }

    //멤버 검증 및 memberId 타입 변환
    private Long extractMemberId() {
        Object memberIdObject = memberService.extractMemberInfo().get("id");
        if (memberIdObject instanceof Long) {
            return (Long) memberIdObject;
        } else if (memberIdObject instanceof Integer) {
            return ((Integer) memberIdObject).longValue();
        } else {
            throw new BusinessLogicException(ExceptionCode.INVALID_MEMBER_ID);
        }
    }

    //좋아요 생성 로직
    private void createBoardLikeEntry(Long boardId, Long memberId, boolean isLiked) {
        BoardLike boardLike = new BoardLike();
        Board board = boardRepository.getById(boardId);
        boardLike.setBoard(board);
        boardLike.setMember(memberRepository.getById(memberId));
        boardLikeRepository.save(boardLike);

        updateBoardLikeCount(boardId);
    }

    //좋아요 개수 업데이트
    private void updateBoardLikeCount(Long boardId) {

        long likeCount = boardLikeRepository.countByBoard_id(boardId);
        Board board = boardRepository.getById(boardId);
        board.setBoardLikesCount(likeCount);
        boardRepository.save(board);
    }
}
