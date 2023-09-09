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
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class BoardLikeService {

    private final BoardLikeRepository boardLikeRepository;
    private final BoardRepository boardRepository;
    private final MemberRepository memberRepository;
    private final MemberService memberService;


    //좋아요 생성
    public BoardLikeResponseDto createBoardLike(Long boardId) {
        Long memberId = extractMemberId();
        validateAlreadyLiked(boardId, memberId);
        processCreateBoardLike(boardId, memberId);

        return createResponseDto(boardId);
    }

    //좋아요 취소
    public BoardLikeResponseDto cancelBoardLike(Long boardId) {
        Long memberId = extractMemberId();
        processCancelBoardLike(boardId, memberId);

        return createResponseDto(boardId);
    }

    //특정 게시물에 특정 회원의 좋아요 여부 확인
    public boolean isBoardLikedByMember(Long boardId, Long memberId) {
        return boardLikeRepository.existsByBoardIdAndMemberId(boardId, memberId);
    }

    //좋아요 여부 검증
    private void validateAlreadyLiked(Long boardId, Long memberId) {
        if (isBoardLikedByMember(boardId, memberId)) {
            throw new BusinessLogicException(ExceptionCode.ALREADY_LIKED);
        }
    }

    //응답 DTO 생성
    private BoardLikeResponseDto createResponseDto(Long boardId) {
        Long likeCount = boardLikeRepository.countByBoardId(boardId);
        boolean isLiked = isBoardLikedByMember(boardId, extractMemberId());
        return new BoardLikeResponseDto(likeCount, isLiked);
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
        boolean exists = boardLikeRepository.existsByBoardIdAndMemberId(boardId, memberId);
        if (exists) {
            boardLikeRepository.deleteByBoardIdAndMemberId(boardId, memberId);
            updateBoardLikeCount(boardId);
        } else {
            throw new BusinessLogicException(ExceptionCode.LIKE_NOT_FOUND);
        }
    }

    //좋아요 개수 업데이트
    private void updateBoardLikeCount(Long boardId) {

        long likeCount = boardLikeRepository.countByBoardId(boardId);
        Board board = boardRepository.getById(boardId);
        board.setBoardLikesCount(likeCount);
        boardRepository.save(board);
    }
}
