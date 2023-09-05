package com.party.image.controller;

import com.party.image.service.AwsService;
import com.party.member.entity.Member;
import com.party.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/images")
public class ImageController {

    private final AwsService awsService;
    private final MemberService memberService;

    //테스트
    @GetMapping
    public String getTestImage(){
        String imagePath = awsService.getThumbnailPath("board/Category_Culture1.png");
        Member member = new Member();
        member.setImageUrl(imagePath);
        System.out.println(imagePath);
        return imagePath;
    }

    //board 이미지 전체 전달
    @GetMapping("/cards")
    public List<String> getBoardImages(){
        List<String> boardImageList = new ArrayList<>();

        boardImageList.add( "https://celebeeimage.s3.ap-northeast-2.amazonaws.com/board/Category_Culture1.png");
        boardImageList.add( "https://celebeeimage.s3.ap-northeast-2.amazonaws.com/board/Category_Culture2.png");
        boardImageList.add( "https://celebeeimage.s3.ap-northeast-2.amazonaws.com/board/Category_Culture3.png");
        boardImageList.add( "https://celebeeimage.s3.ap-northeast-2.amazonaws.com/board/Category_Education1.png");
        boardImageList.add( "https://celebeeimage.s3.ap-northeast-2.amazonaws.com/board/Category_Education2.png");
        boardImageList.add( "https://celebeeimage.s3.ap-northeast-2.amazonaws.com/board/Category_Education3.png");
        boardImageList.add( "https://celebeeimage.s3.ap-northeast-2.amazonaws.com/board/Category_Leisure2.png");

       return boardImageList;
    }
}
