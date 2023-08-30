package com.party.card.repository;

import com.party.card.entity.Card;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface CardRepository extends JpaRepository<Card,Long> {

    @Query("select card from Card card where card.cardId = :cardId")
    Optional<Card> findByIdWithAll(@Param("cardId") Long cardId);


}
