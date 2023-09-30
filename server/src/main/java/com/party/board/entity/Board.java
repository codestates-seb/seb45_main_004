package com.party.board.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.party.alram.entity.Alarm;
import com.party.boardlike.entity.BoardLike;
//import com.party.chatting.entity.ChatRoom;
import com.party.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.persistence.*;
import javax.validation.constraints.Min;
import java.time.LocalDate;
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
    @Min(value = 1)
    private int totalNum; //총 인원수 (작성자가 설정)

    @Column(nullable = false)
    private int currentNum = 1; //현재 인원수

    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    @Min(value = 0)
    private int money;

    @Column(nullable = false)
    private String longitude; //경도

    @Column(nullable = false)
    private String latitude; //위도

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    @Enumerated(value = EnumType.STRING)
    private BoardCategory category;

    @Column(nullable = false)
    @Enumerated(value = EnumType.STRING)
    private BoardStatus status = BoardStatus.BOARD_RECRUITING;

    private long boardLikesCount;

    @Column(nullable = false)
    private String imageUrl;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    @JsonBackReference
    private Member member;

//    @OneToOne
//    @JoinColumn(name = "CHATROOM_ID")
//    private ChatRoom chatRoom;

    @OneToMany(mappedBy = "board", cascade = CascadeType.REMOVE)
    private List<BoardLike> boardLikes = new ArrayList<>();

    @OneToMany(mappedBy = "board",cascade = CascadeType.REMOVE)
    @JsonManagedReference
    private List<Applicant> applicants = new ArrayList<>();

    @OneToMany(mappedBy = "board",cascade = CascadeType.REMOVE)
    @JsonManagedReference
    private List<Alarm> alarms = new ArrayList<>();

    public enum BoardCategory {
        CATEGORY_LEISURE("CATEGORY_LEISURE"),
        CATEGORY_TRAVEL("CATEGORY_TRAVEL"),
        CATEGORY_GAME("CATEGORY_GAME"),
        CATEGORY_CULTURE("CATEGORY_CULTURE"),
        CATEGORY_EDUCATION("CATEGORY_EDUCATION"),
        CATEGORY_ETC("CATEGORY_ETC");

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

    //오늘로 3일 뒤 부터 모임 글 작성 가능
    @PrePersist
    public void validateDate() {
        LocalDate today = LocalDate.now();
        LocalDate allowedStartDate = today.plusDays(3);
        if (date.isBefore(allowedStartDate)) {
            throw new IllegalArgumentException("You can only select a date starting from " + allowedStartDate);
        }
    }
}
