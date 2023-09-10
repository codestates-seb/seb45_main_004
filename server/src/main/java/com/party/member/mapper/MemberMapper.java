package com.party.member.mapper;

import com.party.board.mapper.ApplicantMapper;
import com.party.boardlike.entity.BoardLike;
import com.party.member.dto.*;
import com.party.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Mapper(componentModel = "spring", uses = ApplicantMapper.class)
public interface MemberMapper {
    Member memberPostDtoToMember(MemberPostDto memberPostDto);

    @Mapping(source = "applicants", target = "applicants")
    MemberResponseDto memberToMemberResponseDto(Member member);

    Member memberPatchDtoToMember(MemberPatchDto memberPatchDto);

    List<SimpleMemberResponseDto> memberToSimpleMemberResponseDto(List<Member> member);

    @Mapping(source = "board.id", target = "boardId")
    @Mapping(source = "board.imageUrl", target = "imgUrl")
    MemberBoardLikeResponseDto boardLikeToMemberBoardLikeResponseDto(BoardLike boardLike);
}
