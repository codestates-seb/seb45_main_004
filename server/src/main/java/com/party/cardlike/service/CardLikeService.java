//package com.party.cardlike.service;
//
//import com.party.card.entity.Card;
//import com.party.card.repository.CardRepository;
//import com.party.cardlike.dto.CardLikeResponseDto;
//import com.party.cardlike.entity.CardLike;
//import com.party.cardlike.repository.CardLikeRepository;
//import com.party.member.repository.MemberRepository;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//import java.util.List;
//
//@Slf4j
//@Service
//@Transactional
//@RequiredArgsConstructor
//public class CardLikeService {
//
//    private final CardLikeRepository cardLikeRepository;
//    private final CardRepository cardRepository;
//    private final MemberRepository memberRepository;
//
//    public boolean isCardLikedByMember(Long cardId, Long memberId) {
//        List<CardLike> cardlikes = cardLikeRepository.findByCardIdAndMemberId(cardId, memberId);
//        return !cardlikes.isEmpty();
//    }
//
//    public long getCardLikesCount(Long cardId) {
//        return cardLikeRepository.countByCardId(cardId);
//    }
//
//    public ResponseEntity<CardLikeResponseDto> createCardLike(Long cardId, Long memberId, boolean isLiked) {
//        boolean checkLiked = cardLikeRepository.existsByCardIdAndMemberId(cardId, memberId);
//        if (checkLiked) {
//            throw new IllegalArgumentException("YOU ALREADY LIKED");
//        }
//
//        CardLike cardLike = new CardLike();
//        Card card = cardRepository.getById(cardId);
//        cardLike.setCard(card);
//        cardLike.setMember(memberRepository.getById(memberId));
//        cardLike.setLiked(true);
//        cardLikeRepository.save(cardLike);
//
//        updateCardLikeCount(cardId);
//
//        long likeCount = cardLikeRepository.countByCardId(cardId);
//        boolean updatedIsLiked = cardLikeRepository.existsByCardIdAndMemberId(cardId, memberId);
//        CardLikeResponseDto responseDto = new CardLikeResponseDto(likeCount, updatedIsLiked);
//
//        return ResponseEntity.ok(responseDto);
//    }
//
//    public ResponseEntity<CardLikeResponseDto> cancelCardLike(Long cardId, Long memberId) {
//        List<CardLike> cardLikes = cardLikeRepository.findByCardIdAndMemberId(cardId, memberId);
//        if (!cardLikes.isEmpty()) {
//            CardLike cardLike = cardLikes.get(0);
//            cardLikeRepository.delete(cardLike);
//
//            updateCardLikeCount(cardId);
//
//            long likeCount = cardLikeRepository.countByCardId(cardId);
//            boolean isLiked = cardLikeRepository.existsByCardIdAndMemberId(cardId, memberId);
//            CardLikeResponseDto responseDto = new CardLikeResponseDto(likeCount, isLiked);
//
//            return ResponseEntity.ok(responseDto);
//        } else {
//            return ResponseEntity.notFound().build();
//        }
//    }
//
//    private void updateCardLikeCount(Long cardId) {
//
//        long likeCount = cardLikeRepository.countByCardId(cardId);
//        Card card = cardRepository.getById(cardId);
//        card.setCardLikesCount(likeCount);
//        cardRepository.save(card);
//    }
//}
