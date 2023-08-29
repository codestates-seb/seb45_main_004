package com.party.cardlike.controller;

import com.party.cardlike.dto.CardLikeDto;
import com.party.cardlike.dto.CardLikeResponseDto;
import com.party.cardlike.repository.CardLikeRepository;
import com.party.cardlike.service.CardLikeService;
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


    //좋아요 post
    @PostMapping("/{cardId}/{memberId}")
    public ResponseEntity postCardLike(@PathVariable Long cardId,
                                       @PathVariable Long memberId,
                                       @RequestBody CardLikeDto.Post postDto) {

        boolean isLiked = postDto.isLiked();
        cardLikeService.createCardLike(cardId, memberId, isLiked);
        long likeCount = cardLikeService.getCardLikesCount(cardId);
        boolean updateIsLiked = cardLikeRepository.existsByCard_CardIdAndMember_MemberId(cardId, memberId);
        CardLikeResponseDto responseDto = new CardLikeResponseDto(likeCount, updateIsLiked);

        return new ResponseEntity<>(responseDto, HttpStatus.CREATED);
    }

    // 특정글에 대한 좋아요 수 조회
    @GetMapping("/{cardId}")
    public ResponseEntity getCardLikeCount(@PathVariable Long cardId) {
        long likeCount = cardLikeService.getCardLikesCount(cardId);
        return new ResponseEntity<>(likeCount,HttpStatus.OK);
    }

    // 좋아요 delete
    @DeleteMapping("/{cardId}/{memberId}")
    public ResponseEntity deleteCardLike(@PathVariable Long cardId,
                                         @PathVariable Long memberId) {
        cardLikeService.cancelCardLike(cardId, memberId);

        long likeCount = cardLikeRepository.countByCard_CardId(cardId);
        boolean isLiked = cardLikeRepository.existsByCard_CardIdAndMember_MemberId(cardId, memberId);

        CardLikeResponseDto responseDto = new CardLikeResponseDto(likeCount, isLiked);
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }
}
