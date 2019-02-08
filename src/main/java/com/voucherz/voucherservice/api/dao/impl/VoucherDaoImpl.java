package com.voucherz.voucherservice.api.dao.impl;

import com.voucherz.voucherservice.api.dao.AbstractBaseDao;


import com.voucherz.voucherservice.api.dao.VoucherDao;
import com.voucherz.voucherservice.api.dao.util.RowCountMapper;
import com.voucherz.voucherservice.api.model.Voucher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.util.List;
import java.util.Map;


@Repository
public class VoucherDaoImpl extends AbstractBaseDao<Voucher> implements VoucherDao {
    protected SimpleJdbcCall findByCode;
    protected SimpleJdbcCall findGiftCode;
    @Autowired
    @Override
    public void setDataSource(@Qualifier(value = "dataSource") DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
        update = new SimpleJdbcCall(jdbcTemplate).withProcedureName("UpdateCreateValueVoucher").withReturnValue();
        updatestatus = new SimpleJdbcCall(jdbcTemplate).withProcedureName("DisableVoucher").withReturnValue();
        findByCode = new SimpleJdbcCall(jdbcTemplate).withProcedureName("GetVoucherByCode")
                .returningResultSet(SINGLE_RESULT, new BeanPropertyRowMapper<>(Voucher.class));
        findGiftCode = new SimpleJdbcCall(jdbcTemplate).withProcedureName("GetGiftVoucher")
                .returningResultSet(SINGLE_RESULT, new BeanPropertyRowMapper<>(Voucher.class));

    }
    public Voucher findByCode(String voucherCode) {
        SqlParameterSource in = new MapSqlParameterSource().addValue("code", voucherCode);
        Map<String, Object> m = findByCode.execute(in);
        List<Voucher> list = (List<Voucher>) m.get(SINGLE_RESULT);
        if (list == null || list.isEmpty()) {
            return null;
        }
        return list.get(0);
    }



    @Override
    public Voucher findGiftCode(String code) {
        return null;
    }

}
