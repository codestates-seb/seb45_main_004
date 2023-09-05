package com.party.auth.dto;

import com.party.auth.provider.OAuthProvider;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.GeneratedValue;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OAuth {
    @NotNull
    private OAuthProvider provider;

    @NotNull
    private String code;
}
