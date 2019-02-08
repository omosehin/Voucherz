package com.voucherz.voucherservice.api.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtAuthenticationFilter extends OncePerRequestFilter {
//    @Autowired
//     JwtTokenProvider tokenProvider;

    JwtTokenProvider tokenProvider = new JwtTokenProvider();


    //    @Autowired
//    private CustomUserDetailsService customUserDetailsService;

    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try{
            String jwt = getJwtFromRequest(request);
            //System.out.println(".......hello world");
                //null pointer exception
            System.out.println("================="+StringUtils.hasText(jwt));
            System.out.println("===============kkk=="+tokenProvider.validateToken(jwt));
            if(StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt)){

                String  userId = tokenProvider.getUserIdFromJWT(jwt);

                    System.out.println( userId);
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userId, null, null);


                SecurityContextHolder.getContext().setAuthentication(authentication);

            }
        } catch (Exception ex){
            logger.error("Could not set user authentication in security context", ex);

        }
        filterChain.doFilter(request, response);
    }
    private String getJwtFromRequest(HttpServletRequest request){
        String bearerToken = request.getHeader("Authorization");
        if(StringUtils.hasText(bearerToken)&& bearerToken.startsWith("Bearer")){
            System.out.println(bearerToken);
            return bearerToken.substring(7,bearerToken.length());
        }

        return null;
    }
}
