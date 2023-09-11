package com.party.board.mapper;

import com.party.board.dto.ApplicantResponseDto;
import com.party.board.entity.Applicant;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ApplicantMapper {

    @Mapping(source = "member.id", target = "memberId")
    @Mapping(source = "board.id", target = "boardId")
    @Mapping(source = "member.imageUrl", target = "memberImageUrl")
    @Mapping(source = "board.imageUrl", target = "boardImageUrl")
    ApplicantResponseDto applicantToApplicantResponseDto (Applicant applicant);


    List<ApplicantResponseDto> applicantsToApplicantsResponseDto (List<Applicant> applicants);
}
