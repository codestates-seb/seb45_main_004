package com.party.image.controller;

import com.party.image.service.AwsService;
import com.party.member.entity.Member;
import com.party.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
