package com.voucherz.voucherservice.api.dao;

import com.voucherz.voucherservice.api.model.BaseEntity;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;


import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;

import javax.sql.DataSource;
import java.util.List;
import java.util.Map;


public abstract class AbstractBaseDao<T extends BaseEntity> implements BaseDao<T>{
    protected JdbcTemplate jdbcTemplate;
    protected JdbcTemplate readOnlyJdbcTemplate;
    protected SimpleJdbcCall create, update, delete, find, findAll,updatestatus;

    protected final String SINGLE_RESULT = "object";
    protected final String MULTIPLE_RESULT = "list";
    protected static final String RESULT_COUNT = "count";

//    protected final Logger logger = LoggerFactory.getLogger(this.getClass());

    public abstract void setDataSource(DataSource dataSource);
    //public abstract void setReadOnlyDataSource(DataSource dataSource);

    public T create(T model) throws DataAccessException {
        SqlParameterSource in = new BeanPropertySqlParameterSource(model);
        if(in == null){
            System.out.println("Value of in is null");
        }
        Map<String, Object> m = create.execute(in);
        //long id = (long) m.get("id");
        //model.setId(id);
        return model;
    }

    public boolean update(T model) throws DataAccessException {
        SqlParameterSource in = new BeanPropertySqlParameterSource(model);
        update.execute(in);
        return true;
    }

    public boolean delete(T model) {
        return false;
    }

    public T find(long id) {
        SqlParameterSource in = new MapSqlParameterSource().addValue("id", id);
        Map<String, Object> m = find.execute(in);
        List<T> list = (List<T>) m.get(SINGLE_RESULT);
        if (list == null || list.isEmpty()) {
            return null;
        }
        return list.get(0);
    }

    public boolean updatestatus(String code) throws DataAccessException {
        SqlParameterSource in = new MapSqlParameterSource().addValue("Code", code);
        System.out.println("------------"+code);
        updatestatus.execute(in);
        return true;
    }

    public List<T> findAll() {
        return null;
    }

//    public Page<T> findAll(int pageNumber, int pageSize) {
//        SqlParameterSource in = new MapSqlParameterSource().addValue("pageNumber", pageNumber).addValue("pageSize", pageSize);
//        Map<String, Object> m = findAll.execute(in);
//        List<T> content = (List<T>) m.get(MULTIPLE_RESULT);
//        List<Long> countList = (List<Long>) m.get(RESULT_COUNT);
//
//        long count = 0;
//        if (Objects.nonNull(countList) && !countList.isEmpty()) {
//            count = countList.get(0);
//        }
//        Page<T> page = new Page<>(count, content);
//        return page;
    }

//}
