package com.party.member.dto;

import com.party.board.entity.Board;
import com.party.bookmark.entity.Bookmark;
import com.party.member.entity.Applicant;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;


@Setter
@Getter
public class MemberResponseDto {
    // 추가해야 되는거 팔로우 목록
    private String memberId;
    private String nickname;
    private String email;
    private String gender;
    private String introduce;
    private String imageUrl;
//    private List<Board> boards = new ArrayList<>();
    private List<BoardSimpleResponseDto> boards = new ArrayList<>();
    private List<Bookmark> bookmarks = new ArrayList<>();
    private List<Applicant> applicants = new ArrayList<>();
}
