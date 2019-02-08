package com.voucherz.voucherservice.api.controller.model;

import java.util.List;

public class ValueResponse extends Response {
    private final String status;

    public ValueResponse(String code, String description, List<Error> errors, String status) {
        super(code, description, errors);
        this.status = status;
    }
}
