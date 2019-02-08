package com.voucherz.voucherservice.api.dao.impl;

import com.voucherz.voucherservice.api.dao.AbstractBaseDao;
import com.voucherz.voucherservice.api.dao.DiscountDao;
import com.voucherz.voucherservice.api.dao.util.RowCountMapper;
import com.voucherz.voucherservice.api.model.Discount;
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
public class DiscountDaoImpl extends AbstractBaseDao<Discount> implements  DiscountDao{
    protected SimpleJdbcCall findByCode;
    protected SimpleJdbcCall findByDiscountType;

    @Autowired
    @Override
    public void setDataSource(@Qualifier(value = "dataSource") DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
        create = new SimpleJdbcCall(dataSource).withProcedureName("CreateDiscountVoucher").withReturnValue();
        update = new SimpleJdbcCall(jdbcTemplate).withProcedureName("UpdateDiscountVoucher").withReturnValue();

        findByCode = new SimpleJdbcCall(jdbcTemplate).withProcedureName("find_agent_by_code")
               .returningResultSet(SINGLE_RESULT, new BeanPropertyRowMapper<>(Discount.class));
        findByDiscountType = new SimpleJdbcCall(jdbcTemplate).withProcedureName("findVoucherByDiscount")
                .returningResultSet(MULTIPLE_RESULT, new BeanPropertyRowMapper<>(Discount.class));

    }



    @Override
    public List<Discount> findByDiscountType(String voucherType){
        SqlParameterSource in = new MapSqlParameterSource().addValue("VoucherType",voucherType);
        Map<String, Object> m =findByDiscountType.execute(in);
        List<Discount> list  = (List<Discount>) m.get(MULTIPLE_RESULT);
        if(list == null || list.isEmpty()){
            return null;
        }
        return list;
    }

    @Override
    public Discount findByDiscountCode(String discountCode) {
        return null;
    }



}
