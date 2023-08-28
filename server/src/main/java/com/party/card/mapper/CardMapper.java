package com.party.card.mapper;

import com.party.card.dto.CardDto;
import com.party.card.entity.Card;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CardMapper {

    Card CardPostDtoToCard(CardDto.Post postDto);
}
