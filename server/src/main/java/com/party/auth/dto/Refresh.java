package com.party.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Refresh {
    private String refreshToken;

    public String getRefreshToken() {
        return refreshToken.replace("Bearer ", "");
    }
}
