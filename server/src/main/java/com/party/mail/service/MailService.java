package com.party.mail.service;

import com.party.board.entity.Board;
import com.party.board.service.BoardService;
import com.party.mail.handler.MailHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.io.IOException;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;


@Service
@RequiredArgsConstructor
public class MailService {
    private final JavaMailSender javaMailSender;
    private final BoardService boardService;

    @Async
    public void sendFollowMail(String toEmail, String title, String message, String imageUrl) throws MessagingException, IOException {
        MailHandler mailHandler = new MailHandler(javaMailSender);
        mailHandler.setTo(toEmail);
        mailHandler.setSubject(title);
        String htmlContent = "<p>" + "<p> <img src='" + imageUrl + "' width='50' height='50'>" + message;
        mailHandler.setText(htmlContent, true);
        mailHandler.send();
    }

    @Scheduled(cron = "0 40 11 * * ?")
    public void sendReminderEmailForUpcomingEvents() throws MessagingException, IOException {
        LocalDate now = LocalDate.now();
        LocalDate oneDayLater = now.plus(1, ChronoUnit.DAYS);

        List<Board> upcomingEvents = boardService.findEventsScheduledForDate(oneDayLater);

        for (Board board : upcomingEvents) {
            String title = "CELEBEE의 D-1 알림🐝";
            String message = board.getTitle() + " 모임이 하루전입니다🎉";
            String imageUrl = board.getImageUrl();
            String toEmail = "hsh1040@naver.com";
            sendEmailForBoardCreatedOneDayAgo(toEmail, title, message, imageUrl);
        }
    }
    @Async
    public void sendEmailForBoardCreatedOneDayAgo(String toEmail, String title, String message, String imageUrl) throws MessagingException, IOException {
        MailHandler mailHandler = new MailHandler(javaMailSender);
        mailHandler.setTo(toEmail);
        mailHandler.setSubject(title);
        String htmlContent = "<p>" + "<p> <img src='" + imageUrl + "' width='300' height='300'></p><br>" + message;
        mailHandler.setText(htmlContent, true);
        mailHandler.send();
    }
}


