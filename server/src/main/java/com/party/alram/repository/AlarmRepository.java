package com.party.alram.repository;

import com.party.alram.dto.AlarmResponse;
import com.party.alram.entity.Alarm;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AlarmRepository extends JpaRepository<Alarm, Long> {
    void deleteAllById(Long memberId);

    List<AlarmResponse> findAllById(Long memberId);
}
