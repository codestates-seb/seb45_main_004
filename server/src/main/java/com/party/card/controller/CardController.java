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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@Slf4j
@RestController
@RequestMapping("/cards")
@RequiredArgsConstructor
@Validated
public class CardController {

    private final CardService cardService;
    private final CardMapper mapper;

    // 모임글 Post
    @PostMapping("/new-cards")
    public ResponseEntity postCard(@Valid @RequestBody CardDto.Post postDto) {

        Card createCard = cardService.createCard(postDto);
        CardDto.ResponsePost responsePostDto = new CardDto.ResponsePost(createCard);

        return new ResponseEntity<>(responsePostDto,HttpStatus.CREATED);
    }
}
