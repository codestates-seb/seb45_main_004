package com.party.board.mapper;

import com.party.board.dto.ApplicantResponseDto;
import com.party.board.entity.Applicant;
import com.party.board.entity.Board;
import com.party.member.entity.Member;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-10-24T18:38:41+0900",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 11.0.18 (Azul Systems, Inc.)"
)
@Component
public class ApplicantMapperImpl implements ApplicantMapper {

    @Override
    public ApplicantResponseDto applicantToApplicantResponseDto(Applicant applicant) {
        if ( applicant == null ) {
            return null;
        }

        ApplicantResponseDto applicantResponseDto = new ApplicantResponseDto();

        applicantResponseDto.setMemberId( applicantMemberId( applicant ) );
        applicantResponseDto.setBoardId( applicantBoardId( applicant ) );
        applicantResponseDto.setMemberImageUrl( applicantMemberImageUrl( applicant ) );
        applicantResponseDto.setBoardImageUrl( applicantBoardImageUrl( applicant ) );
        applicantResponseDto.setMemberNickname( applicantMemberNickname( applicant ) );
        applicantResponseDto.setId( applicant.getId() );

        return applicantResponseDto;
    }

    @Override
    public List<ApplicantResponseDto> applicantsToApplicantsResponseDto(List<Applicant> applicants) {
        if ( applicants == null ) {
            return null;
        }

        List<ApplicantResponseDto> list = new ArrayList<ApplicantResponseDto>( applicants.size() );
        for ( Applicant applicant : applicants ) {
            list.add( applicantToApplicantResponseDto( applicant ) );
        }

        return list;
    }

    private Long applicantMemberId(Applicant applicant) {
        if ( applicant == null ) {
            return null;
        }
        Member member = applicant.getMember();
        if ( member == null ) {
            return null;
        }
        Long id = member.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }

    private Long applicantBoardId(Applicant applicant) {
        if ( applicant == null ) {
            return null;
        }
        Board board = applicant.getBoard();
        if ( board == null ) {
            return null;
        }
        Long id = board.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }

    private String applicantMemberImageUrl(Applicant applicant) {
        if ( applicant == null ) {
            return null;
        }
        Member member = applicant.getMember();
        if ( member == null ) {
            return null;
        }
        String imageUrl = member.getImageUrl();
        if ( imageUrl == null ) {
            return null;
        }
        return imageUrl;
    }

    private String applicantBoardImageUrl(Applicant applicant) {
        if ( applicant == null ) {
            return null;
        }
        Board board = applicant.getBoard();
        if ( board == null ) {
            return null;
        }
        String imageUrl = board.getImageUrl();
        if ( imageUrl == null ) {
            return null;
        }
        return imageUrl;
    }

    private String applicantMemberNickname(Applicant applicant) {
        if ( applicant == null ) {
            return null;
        }
        Member member = applicant.getMember();
        if ( member == null ) {
            return null;
        }
        String nickname = member.getNickname();
        if ( nickname == null ) {
            return null;
        }
        return nickname;
    }
}
