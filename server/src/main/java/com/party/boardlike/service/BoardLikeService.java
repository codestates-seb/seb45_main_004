package com.party.boardlike.service;

import com.party.board.entity.Board;
import com.party.board.repository.BoardRepository;
import com.party.boardlike.entity.BoardLike;
import com.party.boardlike.repository.BoardLikeRepository;
import com.party.exception.BusinessLogicException;
import com.party.exception.ExceptionCode;
import com.party.member.repository.MemberRepository;
import com.party.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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


    // 좋아요 생성
    public Board createBoardLike(Long boardId) {
        Long memberId = extractMemberId();

        if (isBoardLikedByMember(boardId, memberId)) {
            throw new IllegalArgumentException("YOU ALREADY LIKED");
        }
        processCreateBoardLike(boardId, memberId);

        return boardRepository.getById(boardId);
    }

    //좋아요 취소
    public Board cancelBoardLike(Long boardId) {
        Long memberId = extractMemberId();
        processCancelBoardLike(boardId, memberId);

        return boardRepository.getById(boardId);
    }

    public boolean isBoardLikedByMember(Long boardId, Long memberId) {
        return boardLikeRepository.existsByBoard_idAndMember_id(boardId, memberId);
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
    private void processCreateBoardLike(Long boardId, Long memberId) {
        BoardLike boardLike = new BoardLike();
        Board board = boardRepository.getById(boardId);
        boardLike.setBoard(board);
        boardLike.setMember(memberRepository.getById(memberId));
        boardLikeRepository.save(boardLike);

        updateBoardLikeCount(boardId);
    }

    //좋아요 취소 로직
    private void processCancelBoardLike(Long boardId, Long memberId) {
        List<BoardLike> boardLikes = boardLikeRepository.findByBoard_idAndMember_id(boardId, memberId);
        if (!boardLikes.isEmpty()) {
            BoardLike boardLike = boardLikes.get(0);
            boardLikeRepository.delete(boardLike);
            updateBoardLikeCount(boardId);
        } else {
            throw new IllegalArgumentException("Like Does Not Exist");
        }
    }

    //좋아요 개수 업데이트
    private void updateBoardLikeCount(Long boardId) {

        long likeCount = boardLikeRepository.countByBoard_id(boardId);
        Board board = boardRepository.getById(boardId);
        board.setBoardLikesCount(likeCount);
        boardRepository.save(board);
    }
}
