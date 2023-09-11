package com.party.member.service;

import com.party.auth.util.CustomAuthorityUtils;
import com.party.exception.BusinessLogicException;
import com.party.exception.ExceptionCode;
import com.party.image.config.AwsS3Config;
import com.party.image.service.AwsService;
import com.party.member.entity.Member;
import com.party.member.repository.MemberRepository;
import com.party.util.UpdateUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;
    private final AwsService awsService;
    private final UpdateUtils<Member> updateUtils;

    public Member createMember(Member member) {
        verifyExistsEmail(member.getEmail());
        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);

        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);

        //계정 생성 시 프로필 이미지 기본으로 설정
        String imagePath = awsService.getThumbnailPath("profile/1.png");
        member.setImageUrl(imagePath);

        return memberRepository.save(member);
    }

    public Member updateMember(Member member) {
        Member findMember = findVerifiedMember(member.getId());

        Member updateMember = updateUtils.copyNonNullProperties(member, findMember);

        return memberRepository.save(updateMember);
    }

    public Member findMember(long memberId) {
        return findVerifiedMember(memberId);
    }

    public List<Member> findMembers() {
        List<Member> members = memberRepository.findAll();
        System.out.println(members);
        return members;
    }

    public void deleteMember(long memberId) {
        memberRepository.deleteById(memberId);
    }

    private Member findVerifiedMember(long memberId) {
        Optional<Member> optionalMember = memberRepository.findById(memberId);
        Member findmember = optionalMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return findmember;
    }

    public void verifyExistsEmail(String email) {
        Optional<Member> findMember = memberRepository.findByEmail(email);
        if (findMember.isPresent()) throw new BusinessLogicException(ExceptionCode.MEMBER_EXIST);
    }

    // SpringSecurityContextHolder에 저장된 Authentication에서 사용자 정보를 빼옵니다
    // memberId, memberEmail, memberNickname 키에 해당 유저의 정보가 할당 되어있습니다
    // Object memberId = memberService.extractMemberInfo().get("Id");
    // 위와 같이 사용하면 memberId가 반환됨!
    // 사용조건은 Access 토큰이 헤더에 포함되어 있어야함 그렇지 않으면 오류발생
    public Map<String, Object> extractMemberInfo() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
        }
        Map<String, Object> principal = (Map<String, Object>) authentication.getPrincipal();
        return principal;
    }

    /*
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
    수정필요
     */
}
