package com.party.card.service;

import com.party.card.entity.Card;
import com.party.card.repository.CardRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class CardService {

    private final CardRepository cardRepository;

    public Card createCard(Card card) {

        return cardRepository.save(card);

    }
}
