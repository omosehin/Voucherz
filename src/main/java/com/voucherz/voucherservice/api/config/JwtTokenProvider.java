package com.voucherz.voucherservice.api.config;

import com.sun.security.auth.UserPrincipal;
import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.security.SignatureException;
import java.util.Base64;
import java.util.Date;

@Service
public class JwtTokenProvider {
    private final Logger logger = LoggerFactory.getLogger(JwtTokenProvider.class);


    private String jwtSecret="SecretKey";


    private long jwtExpirationInMs = 1000000000;

    @PostConstruct
    protected void init(){
        try {
            jwtSecret = Base64.getEncoder().encodeToString(jwtSecret.getBytes("UTF-8"));
        }catch(Exception e){}
    }

    public String generateToken(Authentication authentication){
        //downcasted
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        Date now = new Date();

        Date expiryDate = new Date(now.getTime() + jwtExpirationInMs);

//        Claims claims = Jwts.claims().setSubject(userPrincipal.getEmail());
//        return Jwts.builder()
//                // set sub
////                .setSubject(userPrincipal.getUsername())
//                .setClaims(claims)
//                .setIssuedAt(now)
//                .setExpiration(expiryDate)
//                .signWith(SignatureAlgorithm.HS256, Base64.getEncoder().encodeToString(jwtSecret.getBytes()))
//                .compact();
        return null;
    }
//
//    // decrypting the token
    public String getUserIdFromJWT(String token){
        Claims claims = Jwts.parser()
                .parseClaimsJws(token)
                .getBody();

        return (claims.getSubject());
    }

    public boolean validateToken(String authToken){
        System.out.println("llllfllf");
        try{
            Jwts.parser().setSigningKey(jwtSecret)
                    .parseClaimsJws(authToken);
            return true;

        }catch(MalformedJwtException ex){
            logger.error("Invalid Jwt token");
        }catch(ExpiredJwtException ex){
            logger.error("Expired Jwt Token");
        }catch(UnsupportedJwtException ex){
            logger.error("Unsupported Jwt token");
        }catch(IllegalArgumentException ex){
            logger.error("JWT claims string is empty");
        }
        catch (Exception e){
            logger.error(e.getMessage());
        }

        return false;
    }
}
