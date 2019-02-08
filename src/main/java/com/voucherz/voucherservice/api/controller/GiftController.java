package com.voucherz.voucherservice.api.controller;


import com.voucherz.voucherservice.api.controller.model.GiftRequest;
import com.voucherz.voucherservice.api.dao.GiftDao;
import com.voucherz.voucherservice.api.event.AuditMessage;
import com.voucherz.voucherservice.api.model.Gift;
import com.voucherz.voucherservice.api.service.GiftService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;


@Controller
@RequestMapping("api/voucher")
public class GiftController {
    private GiftService giftService;
    private final GiftDao giftDao;

    Logger log = LoggerFactory.getLogger(this.getClass());

    @Autowired
    public GiftController(GiftService giftService, GiftDao giftDao) {
        this.giftService = giftService;
        this.giftDao = giftDao;
    }

    @RequestMapping(value = "gift/bulk/create", method = RequestMethod.POST)
    @ResponseBody
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Gift> createGiftVoucher(@RequestBody @Validated final GiftRequest giftRequest) {
//        Response response = null;
        int numOfTimeCode = giftRequest.getNumberOfCodeToGenerate();
        Gift voucher = null;
        for (int i = 0; i < numOfTimeCode; i++) {

            voucher = giftService.createGiftVoucher(giftRequest);
            log.info(String.format("Bulk Gift Voucher Created", voucher));
        }
        return new ResponseEntity<>(voucher, HttpStatus.CREATED);
    }

    @RequestMapping(value = "gift/single/create", method = RequestMethod.POST)
    @ResponseBody
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Gift> createSingleGiftVoucher(@RequestBody @Validated final GiftRequest giftRequest) {

        Gift voucher = null;
        AuditMessage event =new AuditMessage("created Single Voucher for Gift", "merchantid", new Date());
            voucher = giftService.createGiftVoucher(giftRequest);
//        }
        return new ResponseEntity<>(voucher, HttpStatus.CREATED);
    }

    @RequestMapping(value = "gift/search/findByGiftType/{type}", method = RequestMethod.GET)
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    public List<Gift> findByGiftType(@PathVariable("type") String giftType) {

        List<Gift>  vouchers = giftService.getGiftVoucherType(giftType);

        return vouchers;
    }

    @RequestMapping(value = "/update/gift/{code}", method = RequestMethod.PUT)
    @ResponseStatus(HttpStatus.OK)
    public void updateDiscountVoucher(@PathVariable( "code" ) String code, @RequestBody @Validated final Gift gift) {

        giftDao.update(gift);

    }


 }
