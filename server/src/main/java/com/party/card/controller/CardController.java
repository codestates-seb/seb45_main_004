package com.party.card.controller;

import com.party.card.dto.CardDto;
import com.party.card.entity.Card;
import com.party.card.mapper.CardMapper;
import com.party.card.service.CardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/cards")
@RequiredArgsConstructor
@Validated
public class CardController {

    private final CardService cardService;
    private final CardMapper mapper;

    // 모임글 등록
    @PostMapping("/new-cards")
    public ResponseEntity postCard(@Valid @RequestBody CardDto.Post postDto) {

        Card createCard = cardService.createCard(postDto);
        CardDto.ResponsePost responsePostDto = new CardDto.ResponsePost(createCard);

        return new ResponseEntity<>(responsePostDto,HttpStatus.CREATED);
    }

    //모임글 상세 조회
    @GetMapping("{card-id}")
    public ResponseEntity getCard(@PathVariable("card-id") long cardId){
        Card card = cardService.findCard(cardId);
        return new ResponseEntity<>(mapper.cardToCardResponse(card),HttpStatus.OK);
    }

    //모임글 전체 조회
    @GetMapping
    public ResponseEntity getCards() {
        List<Card> cards = cardService.findCards();
        return new ResponseEntity<>(mapper.cardsToCardResponse(cards), HttpStatus.OK);
    }
}
