package com.party.cardlike.service;

import com.party.card.entity.Card;
import com.party.card.repository.CardRepository;
import com.party.cardlike.dto.CardLikeResponseDto;
import com.party.cardlike.entity.CardLike;
import com.party.cardlike.repository.CardLikeRepository;
import com.party.member.repository.MemberRepository;
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


    public boolean isCardLikedByMember(Long cardId, Long memberId) {
        return cardLikeRepository.existsByCard_CardIdAndMember_MemberId(cardId, memberId);
    }

    public long getCardLikesCount(Long cardId) {
        return cardLikeRepository.countByCard_CardId(cardId);
    }

    // 좋아요 생성
    public ResponseEntity<CardLikeResponseDto> createCardLike(Long cardId, Long memberId, boolean isLiked) {
        if (isCardLikedByMember(cardId, memberId)) {
            throw new IllegalArgumentException("YOU ALREADY LIKED");
        }

        CardLike cardLike = new CardLike();
        Card card = cardRepository.getById(cardId);
        cardLike.setCard(card);
        cardLike.setMember(memberRepository.getById(memberId));
        cardLike.setLiked(true);
        cardLikeRepository.save(cardLike);

        updateCardLikeCount(cardId);

        long likeCount = cardLikeRepository.countByCard_CardId(cardId);
        boolean updatedIsLiked = true;
        CardLikeResponseDto responseDto = new CardLikeResponseDto(likeCount, updatedIsLiked);

        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    //좋아요 취소
    public ResponseEntity<CardLikeResponseDto> cancelCardLike(Long cardId, Long memberId) {
        List<CardLike> cardLikes = cardLikeRepository.findByCard_CardIdAndMember_MemberId(cardId, memberId);
        if (!cardLikes.isEmpty()) {
            CardLike cardLike = cardLikes.get(0);
            cardLikeRepository.delete(cardLike);

            updateCardLikeCount(cardId);

            long likeCount = cardLikeRepository.countByCard_CardId(cardId);
            boolean isLiked = false;
            CardLikeResponseDto responseDto = new CardLikeResponseDto(likeCount, isLiked);

            return new ResponseEntity<>(responseDto, HttpStatus.OK);

        } else {
            throw new IllegalArgumentException("Like Does Not Exist");
        }
    }
    private void updateCardLikeCount(Long cardId) {

        long likeCount = cardLikeRepository.countByCard_CardId(cardId);
        Card card = cardRepository.getById(cardId);
        card.setCardLikesCount(likeCount);
        cardRepository.save(card);
    }
}
