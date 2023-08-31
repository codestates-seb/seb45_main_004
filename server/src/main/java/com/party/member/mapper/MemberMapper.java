package com.party.member.mapper;

import com.party.board.entity.Board;
import com.party.member.dto.BoardSimpleResponseDto;
import com.party.member.dto.MemberPostDto;
import com.party.member.dto.MemberResponseDto;
import com.party.member.entity.Applicant;
import com.party.member.entity.Member;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface MemberMapper {
    Member memberPostDtoToMember(MemberPostDto memberPostDto);

    MemberResponseDto memberToMemberResponseDto(Member member);

    BoardSimpleResponseDto boardToBoardSimpleResponseDto(Board board);
}
