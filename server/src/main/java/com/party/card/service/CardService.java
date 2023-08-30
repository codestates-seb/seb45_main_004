package com.party.card.service;

import com.party.card.dto.CardDto;
import com.party.card.entity.Card;
import com.party.card.repository.CardRepository;
import com.party.exception.BusinessLogicException;
import com.party.exception.ExceptionCode;
import com.party.member.entity.Member;
import com.party.member.repository.MemberRepository;
import com.party.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class CardService {

    private final CardRepository cardRepository;
    private final MemberService memberService;
    private final MemberRepository memberRepository;

    // 모임글 등록
    public Card createCard(CardDto.Post postDto) {
        Object memberIdObject  = memberService.extractMemberInfo().get("memberId");

        // card 등록 시 memberid 값 저장
        Long memberId;
        if (memberIdObject instanceof Long) {
            memberId = (Long) memberIdObject;
        } else if (memberIdObject instanceof Integer) {
            memberId = ((Integer) memberIdObject).longValue();
        } else {
            // memberId가 올바른 형태로 추출되지 않은 경우 예외 처리
            throw new BusinessLogicException(ExceptionCode.INVALID_MEMBER_ID);
        }

        Optional<Member> memberOptional = memberRepository.findById(memberId);
        if (!memberOptional.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
        }
        Member member = memberOptional.get();

        Card.CardCategory cardCategoryEnum = Card.CardCategory.valueOf(postDto.getCardCategory());

        Card card = new Card();

        String day = postDto.getCardDate();
        LocalDate date = stringToDateConverter(day);

        card.setCardTitle(postDto.getCardTitle());
        card.setCardDate(date);
        card.setCardBody(postDto.getCardBody());
        card.setCardPerson(postDto.getCardPerson());
        card.setCardMoney(postDto.getCardMoney());
        card.setMember(member);
        card.setCardCategory(cardCategoryEnum);

        return cardRepository.save(card);
    }

    private LocalDate stringToDateConverter(String dateString) {

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate date = LocalDate.parse(dateString, formatter);
        return date;
    }

    //모임글 상세 조회
    public Card findCard(long cardId) {
        return cardRepository.findByIdWithAll(cardId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.CARD_NOT_FOUND));
    }

    //모임글 전체 조회
    public List<Card> findCards() {
        return cardRepository.findAll();
    }
}
