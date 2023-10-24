package com.party.member.mapper;

import com.party.board.entity.Applicant;
import com.party.board.entity.Board;
import com.party.boardlike.entity.BoardLike;
import com.party.member.dto.MemberApplicantResponseDto;
import com.party.member.dto.MemberBoardLikeResponseDto;
import com.party.member.dto.MemberPatchDto;
import com.party.member.dto.MemberPostDto;
import com.party.member.dto.MemberResponseDto;
import com.party.member.dto.SimpleMemberResponseDto;
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
public class MemberMapperImpl implements MemberMapper {

    @Override
    public Member memberPostDtoToMember(MemberPostDto memberPostDto) {
        if ( memberPostDto == null ) {
            return null;
        }

        Member.MemberBuilder member = Member.builder();

        member.email( memberPostDto.getEmail() );
        member.nickname( memberPostDto.getNickname() );
        member.gender( memberPostDto.getGender() );
        member.password( memberPostDto.getPassword() );

        return member.build();
    }

    @Override
    public MemberResponseDto memberToMemberResponseDto(Member member) {
        if ( member == null ) {
            return null;
        }

        MemberResponseDto memberResponseDto = new MemberResponseDto();

        if ( member.getId() != null ) {
            memberResponseDto.setId( member.getId() );
        }
        memberResponseDto.setNickname( member.getNickname() );
        memberResponseDto.setEmail( member.getEmail() );
        memberResponseDto.setGender( member.getGender() );
        memberResponseDto.setIntroduce( member.getIntroduce() );
        memberResponseDto.setImageUrl( member.getImageUrl() );
        memberResponseDto.setApplicants( applicantListToMemberApplicantResponseDtoList( member.getApplicants() ) );
        memberResponseDto.setBoardLikes( boardLikeListToMemberBoardLikeResponseDtoList( member.getBoardLikes() ) );

        memberResponseDto.setFollower( member.getToMembers() != null ? member.getToMembers().size() : 0 );
        memberResponseDto.setFollowing( member.getFromMembers() != null ? member.getFromMembers().size() : 0 );

        return memberResponseDto;
    }

    @Override
    public Member memberPatchDtoToMember(MemberPatchDto memberPatchDto) {
        if ( memberPatchDto == null ) {
            return null;
        }

        Member.MemberBuilder member = Member.builder();

        member.introduce( memberPatchDto.getIntroduce() );
        member.imageUrl( memberPatchDto.getImageUrl() );

        return member.build();
    }

    @Override
    public List<SimpleMemberResponseDto> memberToSimpleMemberResponseDto(List<Member> member) {
        if ( member == null ) {
            return null;
        }

        List<SimpleMemberResponseDto> list = new ArrayList<SimpleMemberResponseDto>( member.size() );
        for ( Member member1 : member ) {
            list.add( memberToSimpleMemberResponseDto1( member1 ) );
        }

        return list;
    }

    @Override
    public MemberBoardLikeResponseDto boardLikeToMemberBoardLikeResponseDto(BoardLike boardLike) {
        if ( boardLike == null ) {
            return null;
        }

        MemberBoardLikeResponseDto memberBoardLikeResponseDto = new MemberBoardLikeResponseDto();

        memberBoardLikeResponseDto.setBoardId( boardLikeBoardId( boardLike ) );
        memberBoardLikeResponseDto.setImgUrl( boardLikeBoardImageUrl( boardLike ) );
        memberBoardLikeResponseDto.setBoardStatus( boardLikeBoardStatus( boardLike ) );

        return memberBoardLikeResponseDto;
    }

    @Override
    public MemberApplicantResponseDto applicantToMemberApplicantResponseDto(Applicant applicant) {
        if ( applicant == null ) {
            return null;
        }

        MemberApplicantResponseDto memberApplicantResponseDto = new MemberApplicantResponseDto();

        memberApplicantResponseDto.setImgUrl( applicantBoardImageUrl( applicant ) );
        Long id = applicantBoardId( applicant );
        if ( id != null ) {
            memberApplicantResponseDto.setBoardId( id );
        }
        memberApplicantResponseDto.setBoardStatus( applicantBoardStatus( applicant ) );

        return memberApplicantResponseDto;
    }

    protected List<MemberApplicantResponseDto> applicantListToMemberApplicantResponseDtoList(List<Applicant> list) {
        if ( list == null ) {
            return null;
        }

        List<MemberApplicantResponseDto> list1 = new ArrayList<MemberApplicantResponseDto>( list.size() );
        for ( Applicant applicant : list ) {
            list1.add( applicantToMemberApplicantResponseDto( applicant ) );
        }

        return list1;
    }

    protected List<MemberBoardLikeResponseDto> boardLikeListToMemberBoardLikeResponseDtoList(List<BoardLike> list) {
        if ( list == null ) {
            return null;
        }

        List<MemberBoardLikeResponseDto> list1 = new ArrayList<MemberBoardLikeResponseDto>( list.size() );
        for ( BoardLike boardLike : list ) {
            list1.add( boardLikeToMemberBoardLikeResponseDto( boardLike ) );
        }

        return list1;
    }

    protected SimpleMemberResponseDto memberToSimpleMemberResponseDto1(Member member) {
        if ( member == null ) {
            return null;
        }

        SimpleMemberResponseDto simpleMemberResponseDto = new SimpleMemberResponseDto();

        simpleMemberResponseDto.setId( member.getId() );
        simpleMemberResponseDto.setNickname( member.getNickname() );
        simpleMemberResponseDto.setEmail( member.getEmail() );

        return simpleMemberResponseDto;
    }

    private Long boardLikeBoardId(BoardLike boardLike) {
        if ( boardLike == null ) {
            return null;
        }
        Board board = boardLike.getBoard();
        if ( board == null ) {
            return null;
        }
        Long id = board.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }

    private String boardLikeBoardImageUrl(BoardLike boardLike) {
        if ( boardLike == null ) {
            return null;
        }
        Board board = boardLike.getBoard();
        if ( board == null ) {
            return null;
        }
        String imageUrl = board.getImageUrl();
        if ( imageUrl == null ) {
            return null;
        }
        return imageUrl;
    }

    private Board.BoardStatus boardLikeBoardStatus(BoardLike boardLike) {
        if ( boardLike == null ) {
            return null;
        }
        Board board = boardLike.getBoard();
        if ( board == null ) {
            return null;
        }
        Board.BoardStatus status = board.getStatus();
        if ( status == null ) {
            return null;
        }
        return status;
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

    private Board.BoardStatus applicantBoardStatus(Applicant applicant) {
        if ( applicant == null ) {
            return null;
        }
        Board board = applicant.getBoard();
        if ( board == null ) {
            return null;
        }
        Board.BoardStatus status = board.getStatus();
        if ( status == null ) {
            return null;
        }
        return status;
    }
}
