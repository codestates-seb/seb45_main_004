package com.party.auth.util;


import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class CustomAuthorityUtils {

        private final List<GrantedAuthority> USER_ROLES = AuthorityUtils.createAuthorityList("ROLE_USER");

        private final List<String> USER_ROLES_STRING = List.of("USER");

        public List<GrantedAuthority> createAuthorities(List<String> roles) {
            List<GrantedAuthority> authorities = roles.stream()
                    .map(role -> new SimpleGrantedAuthority("ROLE_" + role))
                    .collect(Collectors.toList());
            return authorities;
        }

        public List<String> createRoles(String email) {
            return USER_ROLES_STRING;
        }
}
