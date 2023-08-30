package com.party.card.mapper;

import com.party.card.dto.CardDto;
import com.party.card.dto.CardResponseDto;
import com.party.card.entity.Card;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CardMapper {
    Card CardPostDtoToCard(CardDto.Post postDto);

    default CardResponseDto cardToCardResponse(Card card) {
        CardResponseDto cardResponseDto = new CardResponseDto();
        cardResponseDto.setMemberId(card.getMember().getMemberId());
        cardResponseDto.setMemberNickname(card.getMember().getMemberNickname());
        cardResponseDto.setCardId(card.getCardId());
        cardResponseDto.setCardTitle(card.getCardTitle());
        cardResponseDto.setCardDate(String.valueOf(card.getCardDate()));
        cardResponseDto.setCardBody(card.getCardBody());
        cardResponseDto.setCardCategory(String.valueOf(card.getCardCategory()));
        cardResponseDto.setTotalPerson(card.getCardPerson());
        cardResponseDto.setCardMoney(card.getCardMoney());
        cardResponseDto.setCardStatus(card.getCardStatus());
        return cardResponseDto;
    }
    List<CardResponseDto> cardsToCardResponse(List<Card> cards);
}
