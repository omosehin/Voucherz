package com.voucherz.voucherservice.api.controller.model;

import com.voucherz.voucherservice.api.model.Voucher;

import java.sql.Date;

public class VoucherRequest {

    private String code;

    private Date startDate;
    private Date expirationDate;
    private String voucherType;
    private String status;
    private String prefix;
    private String postfix;
    private String charset;
    private Integer length;
    private String category;
    private String additionalInfo;
    private String merchantId;
    private Date redeemptionDate;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(Date expirationDate) {
        this.expirationDate = expirationDate;
    }

    public String getVoucherType() {
        return voucherType;
    }

    public void setVoucherType(String voucherType) {
        this.voucherType = voucherType;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getPrefix() {
        return prefix;
    }

    public void setPrefix(String prefix) {
        this.prefix = prefix;
    }

    public String getPostfix() {
        return postfix;
    }

    public void setPostfix(String postfix) {
        this.postfix = postfix;
    }

    public String getCharset() {
        return charset;
    }

    public void setCharset(String charset) {
        this.charset = charset;
    }

    public Integer getLength() {
        return length;
    }

    public void setLength(Integer length) {
        this.length = length;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getAdditionalInfo() {
        return additionalInfo;
    }

    public void setAdditionalInfo(String additionalInfo) {
        this.additionalInfo = additionalInfo;
    }

    public String getMerchantId() {
        return merchantId;
    }

    public void setMerchantId(String merchantId) {
        this.merchantId = merchantId;
    }

    public Date getRedeemptionDate() {
        return redeemptionDate;
    }

    public void setRedeemptionDate(Date redeemptionDate) {
        this.redeemptionDate = redeemptionDate;
    }

    @Override
    public String toString() {
        return "VoucherRequest{" +
                "code='" + code + '\'' +
                ", startDate=" + startDate +
                ", expirationDate=" + expirationDate +
                ", voucherType='" + voucherType + '\'' +
                ", status='" + status + '\'' +
                ", prefix='" + prefix + '\'' +
                ", postfix='" + postfix + '\'' +
                ", charset='" + charset + '\'' +
                ", length=" + length +
                ", category='" + category + '\'' +
                ", additionalInfo='" + additionalInfo + '\'' +
                ", merchantId=" + merchantId +
                ", redeemptionDate=" + redeemptionDate +
                '}';
    }
}
