package com.voucherz.voucherservice.api.dao.impl;

import com.voucherz.voucherservice.api.dao.AbstractBaseDao;
import com.voucherz.voucherservice.api.dao.GiftDao;
import com.voucherz.voucherservice.api.dao.util.RowCountMapper;
import com.voucherz.voucherservice.api.model.Gift;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.util.List;
import java.util.Map;

@Repository
public class GiftDaoImpl extends AbstractBaseDao<Gift> implements  GiftDao{

    protected SimpleJdbcCall findByGiftType;
    protected SimpleJdbcCall findByCode;


    @Autowired
    @Override
    public void setDataSource(@Qualifier(value = "dataSource") DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
        create = new SimpleJdbcCall(dataSource).withProcedureName("CreateGiftVoucher").withReturnValue();
        update = new SimpleJdbcCall(jdbcTemplate).withProcedureName("UpdateGiftVoucher").withReturnValue();
        find = new SimpleJdbcCall(jdbcTemplate).withProcedureName("find_agent")
                .returningResultSet(SINGLE_RESULT, new BeanPropertyRowMapper<>(Gift.class));
        findByCode = new SimpleJdbcCall(jdbcTemplate).withProcedureName("")
                .returningResultSet(SINGLE_RESULT, new BeanPropertyRowMapper<>(Gift.class));
        findByGiftType = new SimpleJdbcCall(jdbcTemplate).withProcedureName("findVoucherByGift")
                .returningResultSet(MULTIPLE_RESULT, new BeanPropertyRowMapper<>(Gift.class));

    }


    public List<Gift> findByGiftType(String voucherType){
        SqlParameterSource in = new MapSqlParameterSource().addValue("VoucherType",voucherType);
        Map<String, Object> m =findByGiftType.execute(in);
        List<Gift> list  = (List<Gift>) m.get(MULTIPLE_RESULT);
        if(list == null || list.isEmpty()){
            return null;
        }
        return list;
    }

}
