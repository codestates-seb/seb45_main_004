package com.party.cardlike.service;

import com.party.card.entity.Card;
import com.party.card.repository.CardRepository;
import com.party.cardlike.dto.CardLikeResponseDto;
import com.party.cardlike.entity.CardLike;
import com.party.cardlike.repository.CardLikeRepository;
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
public class CardLikeService {

    private final CardLikeRepository cardLikeRepository;
    private final CardRepository cardRepository;
    private final MemberRepository memberRepository;
    private final MemberService memberService;


    public boolean isCardLikedByMember(Long cardId, Long memberId) {
        return cardLikeRepository.existsByCard_CardIdAndMember_MemberId(cardId, memberId);
    }

    public long getCardLikesCount(Long cardId) {
        return cardLikeRepository.countByCard_CardId(cardId);
    }

    // 좋아요 생성
    public ResponseEntity<CardLikeResponseDto> createCardLike(Long cardId,boolean isLiked) {
        Long memberId = extractMemberId();

        if (isCardLikedByMember(cardId, memberId)) {
            throw new IllegalArgumentException("YOU ALREADY LIKED");
        }

        createCardLikeEntry(cardId, memberId, true);
        long likeCount = getCardLikesCount(cardId);
        CardLikeResponseDto responseDto = new CardLikeResponseDto(likeCount, true);

        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    //좋아요 취소
    public ResponseEntity<CardLikeResponseDto> cancelCardLike(Long cardId) {
        Long memberId = extractMemberId();

        List<CardLike> cardLikes = cardLikeRepository.findByCard_CardIdAndMember_MemberId(cardId, memberId);
        if (!cardLikes.isEmpty()) {
            CardLike cardLike = cardLikes.get(0);
            cardLikeRepository.delete(cardLike);

            updateCardLikeCount(cardId);

            long likeCount = getCardLikesCount(cardId);
            CardLikeResponseDto responseDto = new CardLikeResponseDto(likeCount, false);

            return new ResponseEntity<>(responseDto, HttpStatus.OK);
        } else {
            throw new IllegalArgumentException("Like Does Not Exist");
        }
    }

    //멤버 검증 및 memberId 타입 변환
    private Long extractMemberId() {
        Object memberIdObject = memberService.extractMemberInfo().get("memberId");
        if (memberIdObject instanceof Long) {
            return (Long) memberIdObject;
        } else if (memberIdObject instanceof Integer) {
            return ((Integer) memberIdObject).longValue();
        } else {
            throw new BusinessLogicException(ExceptionCode.INVALID_MEMBER_ID);
        }
    }

    //좋아요 생성 로직
    private void createCardLikeEntry(Long cardId, Long memberId, boolean isLiked) {
        CardLike cardLike = new CardLike();
        Card card = cardRepository.getById(cardId);
        cardLike.setCard(card);
        cardLike.setMember(memberRepository.getById(memberId));
        cardLike.setLiked(isLiked);
        cardLikeRepository.save(cardLike);

        updateCardLikeCount(cardId);
    }

    //좋아요 개수 업데이트
    private void updateCardLikeCount(Long cardId) {

        long likeCount = cardLikeRepository.countByCard_CardId(cardId);
        Card card = cardRepository.getById(cardId);
        card.setCardLikesCount(likeCount);
        cardRepository.save(card);
    }
}
