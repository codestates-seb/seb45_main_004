package com.party.cardlike.controller;

import com.party.cardlike.dto.CardLikeDto;
import com.party.cardlike.dto.CardLikeResponseDto;
import com.party.cardlike.repository.CardLikeRepository;
import com.party.cardlike.service.CardLikeService;
import com.party.exception.BusinessLogicException;
import com.party.exception.ExceptionCode;
import com.party.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/likes")
public class CardLikeController {

    private final CardLikeService cardLikeService;
    private final CardLikeRepository cardLikeRepository;
    private final MemberService memberService;


    //좋아요 post
        @PostMapping("/{card-id}")
        public ResponseEntity postCardLike(@PathVariable("card-id") Long cardId,
                                           @RequestBody CardLikeDto.Post postDto) {

            boolean isLiked = postDto.isLiked();
            Long memberId = extractMemberId();

            cardLikeService.createCardLike(cardId,isLiked);

            long likeCount = cardLikeService.getCardLikesCount(cardId);
            boolean updateIsLiked = cardLikeRepository.existsByCard_CardIdAndMember_MemberId(cardId, memberId);
            CardLikeResponseDto responseDto = new CardLikeResponseDto(likeCount, updateIsLiked);

            return new ResponseEntity<>(responseDto, HttpStatus.CREATED);
        }

    // 특정글에 대한 좋아요 수 조회
    @GetMapping("/{card-id}")
    public ResponseEntity getCardLikeCount(@PathVariable("card-id") Long cardId) {
        long likeCount = cardLikeService.getCardLikesCount(cardId);
        return new ResponseEntity<>(likeCount,HttpStatus.OK);
    }

    // 좋아요 delete
    @DeleteMapping("/{card-id}")
    public ResponseEntity deleteCardLike(@PathVariable("card-id") Long cardId) {
        cardLikeService.cancelCardLike(cardId);

        Long memberId = extractMemberId();
        long likeCount = cardLikeRepository.countByCard_CardId(cardId);
        boolean isLiked = cardLikeRepository.existsByCard_CardIdAndMember_MemberId(cardId, memberId);

        CardLikeResponseDto responseDto = new CardLikeResponseDto(likeCount, isLiked);
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    //memberId 추출
    private Long extractMemberId() {
        Object memberIdObject  = memberService.extractMemberInfo().get("memberId");

        if (memberIdObject instanceof Long) {
            return (Long) memberIdObject;
        } else if (memberIdObject instanceof Integer) {
             return ((Integer) memberIdObject).longValue();
        } else {
            throw new BusinessLogicException(ExceptionCode.INVALID_MEMBER_ID);
        }
    }
}
