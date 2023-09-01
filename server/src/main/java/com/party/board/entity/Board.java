package com.party.board.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.party.boardlike.entity.BoardLike;
import com.party.chatting.entity.Chatting;
import com.party.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Entity
@Getter
@Setter
public class Board {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String body;

    @Column(nullable = false)
    private int totalNum; //총 인원수 (작성자가 설정)

    @Column(nullable = false)
    private int currentNum = 1; //현재 인원수

    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    private int money;

    @Column
    private String longitude; //경도

    @Column
    private String latitude; //위도

    @Column
    private String address;

    @Column(nullable = false)
    @Enumerated(value = EnumType.STRING)
    private BoardCategory category = BoardCategory.CATEGORY_ETC;

    @Column(nullable = false)
    @Enumerated(value = EnumType.STRING)
    private BoardStatus status = BoardStatus.BOARD_RECRUITING;

    private LocalDateTime createdAt = LocalDateTime.now();

    private long boardLikesCount;

    private String imageUrl;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    @JsonBackReference
    private Member member;

    @OneToOne
    @JoinColumn(name = "CHATTING_ID")
    private Chatting chatting;

    @OneToMany(mappedBy = "board", cascade = CascadeType.REMOVE)
    private List<BoardLike> boardLikes = new ArrayList<>();

    @OneToMany(mappedBy = "board",cascade = CascadeType.REMOVE)
    @JsonManagedReference
    private List<Applicant> applicants = new ArrayList<>();

    public enum BoardCategory {
        CATEGORY_LEISURE("LEISURE"),
        CATEGORY_TRAVEL("TRAVEL"),
        CATEGORY_GAME("GAME"),
        CATEGORY_CULTURE("CULTURE"),
        CATEGORY_EDUCATION("EDUCATION"),
        CATEGORY_ETC("ETC");

        @Getter
        private String category;

        BoardCategory(String category) {
            this.category = category;
        }
    }
    public enum BoardStatus {
        BOARD_RECRUITING("모집 중"),
        BOARD_STATUS("모집 마감"),
        ;

        @Getter
        private String status;

        BoardStatus(String status) {
            this.status = status;
        }
    }
}
