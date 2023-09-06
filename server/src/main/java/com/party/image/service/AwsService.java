package com.party.image.service;

import com.amazonaws.services.s3.AmazonS3Client;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class AwsService {

    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;

    public String getThumbnailPath(String path) {
        return amazonS3Client.getUrl(bucketName, path).toString();
    }

    //보드 이미지 모두 조회
    public List<String> getImagesAll (String directory ,String category){
        List<String> list = new ArrayList<>();

        for (int i = 1; i<4; i++){
            String str = String.valueOf(i)+ ".png";
            System.out.println(str);
            list.add(getThumbnailPath(directory + category + str));
        }

        return list;
    }

    //프로필 이미지 모두 조회
    public List<String> getProfileImageAll (String directory){
        List<String> list = new ArrayList<>();

        for (int i = 1; i<4; i++){
            String str = String.valueOf(i)+ ".png";
            System.out.println(str);
            list.add(getThumbnailPath(directory + str));
        }

        return list;

    }
}
