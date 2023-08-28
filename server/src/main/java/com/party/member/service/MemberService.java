package com.party.member.service;

import com.party.auth.util.CustomAuthorityUtils;
import com.party.exception.BusinessLogicException;
import com.party.exception.ExceptionCode;
import com.party.member.controller.MemberController;
import com.party.member.entity.Member;
import com.party.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;

    public Member createMember(Member member) {
        verifyExistsEmail(member.getMemberEmail());
        String encryptedPassword = passwordEncoder.encode(member.getMemberPassword());
        member.setMemberPassword(encryptedPassword);

        List<String> roles = authorityUtils.createRoles(member.getMemberEmail());
        member.setRoles(roles);

        return memberRepository.save(member);
    }

    public void verifyExistsEmail(String email) {
        Optional<Member> findMember = memberRepository.findByMemberEmail(email);
        if (findMember.isPresent()) throw new BusinessLogicException(ExceptionCode.MEMBER_EXIST);
    }

    public void verifyMemberOwnership(String nickname) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
        }
        Object principal = authentication.getPrincipal();

        System.out.println(nickname);
        System.out.println(principal);

        if (!nickname.equals(principal.toString())) {
            throw new BusinessLogicException(ExceptionCode.PERMISSION_NOT_EXIST);
        }

    }
}
