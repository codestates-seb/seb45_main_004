package com.party.cardlike.mapper;

import com.party.card.dto.CardDto;
import com.party.card.dto.CardResponseDto;
import com.party.cardlike.dto.CardLikeDto;
import com.party.cardlike.dto.CardLikeResponseDto;
import com.party.cardlike.entity.CardLike;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CardLikeMapper {

    CardLike cardLikePostDtoToCardLike(CardLikeDto.Post postDto);

    CardLike cardLikeResponseDtoToCardLike(CardResponseDto responseDto);

    CardLikeResponseDto cardLikeToCardLikeResponseDto(CardLike cardLike);

}
