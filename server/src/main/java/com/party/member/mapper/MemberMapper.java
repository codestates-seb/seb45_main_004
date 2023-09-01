package com.party.member.mapper;

import com.party.member.dto.MemberPostDto;
import com.party.member.dto.MemberResponseDto;
import com.party.member.entity.Member;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MemberMapper {
    Member memberPostDtoToMember(MemberPostDto memberPostDto);

    MemberResponseDto memberToMemberResponseDto(Member member);
}
