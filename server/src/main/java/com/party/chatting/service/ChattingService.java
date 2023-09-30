package com.party.chatting.service;

import com.party.chatting.Dto.ChattingDto;
import com.party.chatting.entity.Chatting;
import com.party.chatting.mapper.ChattingMapper;
import com.party.chatting.repository.ChattingRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class ChattingService {

    private final ChattingMapper mapper;
    private final ChattingRepository chattingRepository;
    public void saveChat(ChattingDto chattingDto) {
        log.info("전달 받은 ChattingDto: " + chattingDto);
        Chatting chat = mapper.ChattingDtoToChatting(chattingDto);
        chattingRepository.save(chat);
        log.info("저장된 Chatting Entity: " + chat);
    }
}
