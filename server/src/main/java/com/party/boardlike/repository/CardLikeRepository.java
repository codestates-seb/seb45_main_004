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
//    List<CardLike> findByCard_CardIdAndMember_MemberId(Long cardId, Long memberId);
//
//    long countByCard_CardId(Long cardId);
//
//    long countByCard(Card card);
//
//    boolean existsByCard_CardIdAndMember_MemberId(Long cardId, Long memberId);
//
//    List<CardLike> findByMember_MemberIdAndIsLikedTrue(Long memberId);
//
//}