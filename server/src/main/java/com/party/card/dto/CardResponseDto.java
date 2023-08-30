package com.party.card.dto;

import com.party.card.entity.Card;
import com.party.member.entity.Member;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CardResponseDto {

    private long cardId;
    private long memberId;
    private String memberNickname;
    private String cardTitle;
    private String cardDate;
    private String cardBody;
    private String cardCategory;
    private int currentPerson;
    private int totalPerson;
    private int cardMoney;
    private long cardLikesCount;
    private Card.CardStatus cardStatus;

    public Member getMember() {
        Member member = new Member();
        member.setMemberId(memberId);
        member.setMemberNickname(memberNickname);
        return member;
    }

    public String  getCardStatus() {
        return cardStatus.getStatus();
    }
}
