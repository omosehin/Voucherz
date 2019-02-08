package com.voucherz.voucherservice.api.service.impl;

import com.voucherz.voucherservice.VoucherserviceApplication;
import com.voucherz.voucherservice.api.model.Discount;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest(classes= VoucherserviceApplication.class)
@AutoConfigureMockMvc
public class DiscountServiceImplTest extends AbstractTest{
    @Override
    @Before
    public void setUp(){
        super.setUp();
    }

    @Autowired
    private MockMvc mvc;

        @Test
        public void createVoucher() throws Exception{

            String uri="/api/voucher/discount/bulk/create";
            Discount discount = new Discount();
            discount.setCode("");
            discount.setStartDate("2019/01/20");
            discount.setExpirationDate("2019-02-20");
            discount.setStatus("ACTIVE");
            discount.setVoucherType("Discount"));
            discount.setCharset("Numeric");
            discount.setPostfix("jkd");
            discount.setPrefix("we");
            discount.setAdditionalInfo("testing");
            discount.setMerchantId("admin@gmail.com");
            discount.setLength(5);
            discount.setCategory("Discount Voucher for New Customer");
            discount.setDiscountType("Unit");
            discount.setDiscountValue(20);



            int status = mvcResult.getResponse().getStatus();
            assertEquals(201, status);
            String content = mvcResult.getResponse().getContentAsString();
            assertEquals(content, "201", "201");


        }

    }
}