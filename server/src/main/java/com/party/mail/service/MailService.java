package com.party.mail.service;

import com.party.mail.handler.MailHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.io.IOException;
import java.net.URL;

@Service
@RequiredArgsConstructor
public class MailService {
    private final JavaMailSender javaMailSender;

    @Async
    public void sendMail(String toEmail, String title, String message,String imageUrl) throws MessagingException, IOException {
        MailHandler mailHandler = new MailHandler(javaMailSender);
        mailHandler.setTo(toEmail);
        mailHandler.setSubject(title);
        String htmlContent = "<p>" + "<p> <img src='" + imageUrl + "' width='50' height='50'>" + message;
        mailHandler.setText(htmlContent, true);
//        URL imageUrlAsURL = new URL(imageUrl);
//        mailHandler.setInline("mail-image", imageUrlAsURL);
        mailHandler.send();
    }
}

