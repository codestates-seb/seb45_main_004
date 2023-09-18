package com.party.mail.handler;


import org.springframework.core.io.UrlResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.IOException;
import java.net.URL;


public class MailHandler {

    private final JavaMailSender javaMailSender;
    private final MimeMessage mimeMessage;
    private final MimeMessageHelper mimeMessageHelper;

    public MailHandler(JavaMailSender javaMailSender) throws MessagingException {
        this.javaMailSender = javaMailSender;
        this.mimeMessage = javaMailSender.createMimeMessage();
        this.mimeMessageHelper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
    }


    public void setFrom(String fromAddress) throws MessagingException {
        mimeMessageHelper.setFrom(fromAddress);
    }
    public void setTo(String email) throws MessagingException {
        mimeMessageHelper.setTo(email);
    }

    public void setSubject(String subject) throws MessagingException {
        mimeMessageHelper.setSubject(subject);
    }

    public void setText(String text, boolean useHtml) throws MessagingException {
        mimeMessageHelper.setText(text, useHtml);
    }

    public void setInline(String fileName,URL imageUrl) throws MessagingException, IOException {
        UrlResource urlResource = new UrlResource(imageUrl);
        mimeMessageHelper.addInline(fileName,urlResource);
    }

    public void send() {
        javaMailSender.send(mimeMessage);
    }
}
