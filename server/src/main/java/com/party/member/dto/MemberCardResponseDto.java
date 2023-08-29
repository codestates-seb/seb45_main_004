package com.party.member.dto;

import com.party.member.entity.MemberCard;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class MemberCardResponseDto {
    private long cardId;
    private String cardTitle;
    private String cardImageUrl;
    private long cardLikesCount;
    private MemberCard.CardType cardType;
}
