package com.party.card.service;

import com.party.card.entity.Card;
import com.party.card.repository.CardRepository;
import com.party.exception.BusinessLogicException;
import com.party.exception.ExceptionCode;
import com.party.member.entity.Member;
import com.party.member.repository.MemberRepository;
import com.party.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class CardService {

    private final CardRepository cardRepository;
    private final MemberService memberService;
    private final MemberRepository memberRepository;

    public Card createCard(Card card) {

//        Member member = card.getMember();
//        Optional<Member> verifiedMember = memberRepository.findById(member.getMemberId());
//        if (!verifiedMember.isPresent()) {
//            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
//        }
//        card.setMember(member);
        return cardRepository.save(card);
    }
}
