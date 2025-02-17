package com.ecommerce.project.security.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class UserInfoResponse {
    private long id;
    private String token;
    private String username;
    private List<String> roles;

    public UserInfoResponse(List<String> roles, String username, long id) {
        this.roles = roles;
        this.username = username;
        this.id = id;
    }
}
