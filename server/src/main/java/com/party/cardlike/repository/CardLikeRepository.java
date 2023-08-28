//package com.party.cardlike.repository;
//
//import com.party.card.entity.Card;
//import com.party.cardlike.entity.CardLike;
//import org.springframework.data.jpa.repository.JpaRepository;
//
//import java.util.List;
//
//
//public interface CardLikeRepository extends JpaRepository<CardLike, Long> {
//
//    List<CardLike> findByCardIdAndMemberId(Long cardId, Long memberId);
//
//    long countByCardId(Long cardId);
//
//    long countByCard(Card card);
//
//    boolean existsByCardIdAndMemberId(Long cardId, Long memberId);
//
//    List<CardLike>findByMemberIdAndIsLiked(Long memberId);
//
//}
