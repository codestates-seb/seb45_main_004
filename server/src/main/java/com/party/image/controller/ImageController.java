package com.party.image.controller;

import com.party.image.service.AwsService;
import com.party.member.entity.Member;
import com.party.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping
public class ImageController {

    private final AwsService awsService;
    private final MemberService memberService;

    //테스트
    @GetMapping("/images")
    public List<String> getTestImage(){
        List<String> list = awsService.getFileList("board");
        return list;
    }

    //board 이미지 전달
    @GetMapping("/cards/{category}/images")
    public List<String> getBoardImages(@PathVariable("category") String category){

       List<String> boardImageList = awsService.getFileList("board/"+category);

       return boardImageList;
    }

    //profile 이미지 전달
    @GetMapping("members/images")
    public List<String> getProfileImages (){
        List<String> profileImageList = awsService.getFileList("profile");
        return profileImageList;
    }
}
