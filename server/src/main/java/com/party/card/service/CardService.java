package com.party.card.service;

import com.party.card.dto.CardDto;
import com.party.card.entity.Card;
import com.party.card.repository.CardRepository;
import com.party.exception.BusinessLogicException;
import com.party.exception.ExceptionCode;
import com.party.member.repository.MemberRepository;
import com.party.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.orm.hibernate5.SpringSessionContext;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.swing.text.DateFormatter;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Map;

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
        /* member 검증
        Member member = card.getMember();
        Optional<Member> verifiedMember = memberRepository.findById(member.getMemberId());
        if (!verifiedMember.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
        }
        card.setMember(member);

         */
//        Object memberId = memberService.extractMemberInfo().get("memberId");

        Card card = new Card();

        String day = postDto.getCardDate();
        LocalDate date = stringToDateConverter(day);

        card.setCardTitle(postDto.getCardTitle());
        card.setCardDate(date);
        card.setCardBody(postDto.getCardBody());
        card.setCardPerson(postDto.getCardPerson());
        card.setCardMoney(postDto.getCardMoney());

        return cardRepository.save(card);
    }

    private LocalDate stringToDateConverter(String dateString) {

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate date = LocalDate.parse(dateString, formatter);
        return date;
    }
}
