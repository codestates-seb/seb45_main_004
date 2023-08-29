package com.party.member.mapper;

import com.party.member.dto.MemberCardResponseDto;
import com.party.member.dto.MemberPostDto;
import com.party.member.dto.MemberResponseDto;
import com.party.member.entity.Member;
import com.party.member.entity.MemberCard;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface MemberMapper {
    Member memberPostDtoToMember(MemberPostDto memberPostDto);

    MemberResponseDto memberToMemberResponseDto(Member member);

    @Mapping(source = "card.cardId", target = "cardId")
    @Mapping(source = "card.cardTitle", target = "cardTitle")
    @Mapping(source = "card.cardImageUrl", target = "cardImageUrl")
    @Mapping(source = "card.cardLikesCount", target = "cardLikesCount")
    MemberCardResponseDto memberCardToMemberCardResponseDto(MemberCard memberCard);
}
