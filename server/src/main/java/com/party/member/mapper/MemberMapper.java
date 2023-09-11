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

    @Mapping(target = "follower", expression = "java(member.getToMembers() != null ? member.getToMembers().size() : 0)")
    @Mapping(target = "following", expression = "java(member.getFromMembers() != null ? member.getFromMembers().size() : 0)")
    MemberResponseDto memberToMemberResponseDto(Member member);

    Member memberPatchDtoToMember(MemberPatchDto memberPatchDto);

    List<SimpleMemberResponseDto> memberToSimpleMemberResponseDto(List<Member> member);

    @Mapping(target = "boardId", source = "board.id")
    @Mapping(target = "imgUrl", source = "board.imageUrl")
    MemberBoardLikeResponseDto boardLikeToMemberBoardLikeResponseDto(BoardLike boardLike);
}
