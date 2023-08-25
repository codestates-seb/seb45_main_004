package com.party.alram.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Entity
@Getter
@Setter
public class Alarm {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long alarmId;
    @Enumerated
    private AlarmStatus alarmStatus;

    public enum AlarmStatus {

    }
}
