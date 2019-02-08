package com.voucherz.voucherservice.api.controller;


import com.voucherz.voucherservice.api.controller.model.ValueRequest;
import com.voucherz.voucherservice.api.dao.ValueDao;
import com.voucherz.voucherservice.api.event.AuditMessage;
import com.voucherz.voucherservice.api.model.Value;
import com.voucherz.voucherservice.api.service.ValueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.List;

@Controller
@RequestMapping("api/voucher")
public class ValueController {
    private final ValueService valueService;
    private final ValueDao valueDao;

    @Autowired
    public ValueController(ValueService valueService, ValueDao valueDao) {
        this.valueService = valueService;
        this.valueDao = valueDao;
    }

    @RequestMapping(value = "value/bulk/create", method = RequestMethod.POST)
    @ResponseBody
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Value> createVoucher(@RequestBody @Validated final ValueRequest valueRequest) {
//        Response response = null;
        int numOfTimeCode = valueRequest.getNumberOfCodeToGenerate();
        Value voucher = null;
        for (int i = 0; i < numOfTimeCode; i++) {
            AuditMessage event =new AuditMessage("created bulk voucher for value", "merchantid", new java.util.Date());
            voucher = valueService.createValueVoucher(valueRequest);
        }
        return new ResponseEntity<>(voucher, HttpStatus.CREATED);
    }

    @RequestMapping(value = "value/single/create", method = RequestMethod.POST)
    @ResponseBody
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Value> createSingleValueVoucher(@RequestBody @Validated final ValueRequest valueRequest) {

        Value voucher = null;
        AuditMessage event =new AuditMessage("created single voucher for value", "merchantid", new java.util.Date());
        voucher = valueService.createValueVoucher(valueRequest);
        return new ResponseEntity<>(voucher, HttpStatus.CREATED);
    }


        @RequestMapping(value = "/search/bytype/*/{type}", method = RequestMethod.GET)
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    public List<Value> findByValueType(@PathVariable("type") String voucherType) {

        List<Value>  vouchers = valueService.getValueVoucheType(voucherType);

        return vouchers;
    }


    @RequestMapping(value = "/update/value/{code}", method = RequestMethod.PUT)
    @ResponseStatus(HttpStatus.OK)
    public void updateValueVoucher(@PathVariable( "code" ) String code, @RequestBody @Validated final Value value) {

         valueDao.update(value);
    }

    @RequestMapping(value = "search/value/{code}", method = RequestMethod.GET)
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    public Value findByValueCode(@PathVariable( "code" ) String code) {
        Value value = valueDao.findByValueCode(code);
        return value;
    }

}

