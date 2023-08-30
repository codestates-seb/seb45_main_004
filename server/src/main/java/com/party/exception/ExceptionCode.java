package com.party.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_EXIST(409, "Member exists"),
    MEMBER_NOT_FOUND(404, "Member not found"),
    CARD_NOT_FOUND(405, "card not found"),
    COMMENT_NOT_FOUND(405, "comment not found"),
    PERMISSION_NOT_EXIST(409, "You don't have permission to access this resource."),
    COMMENT_EXISTS(400,"comment exists"),
    INVALID_MEMBER_ID(400,"Invalid memberId format");


    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
