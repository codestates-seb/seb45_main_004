package com.party.alram.repository;

import com.party.alram.entity.Alarm;
import com.party.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

public interface AlarmRepository extends JpaRepository<Alarm, Long> {
    void deleteAllByMember_Id(Long memberId);


    List<Alarm> findAlarmByMember_Id(Long memberId);
}
