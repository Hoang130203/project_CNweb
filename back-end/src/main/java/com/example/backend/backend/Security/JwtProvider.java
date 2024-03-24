package com.example.backend.backend.Security;

import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Date;

//
@Component
public class JwtProvider {

    private final static Logger logger = LoggerFactory.getLogger(JwtProvider.class);

    //Khóa bí mật
    @Value("${jwt.secret}")
    private String secret;

    //Thời gian hết hạn token
    @Value("${jwt.expiration}")
    private int expiration;

    //Token được ký bằng thuật toán HS512 và chứa thông tin về người dùng (username) cũng như thời gian phát hành và hết hạn.
    public String generateToken(Authentication authentication){

        UserDetails mainUser = (UserDetails) authentication.getPrincipal();
        logger.error(mainUser.getUsername());
        return Jwts.builder().setSubject(mainUser.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime() + expiration *1000))
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact();
    }
    //trích xuất và trả về tên người dùng từ một token JWT
    public String getAccountFromToken(String token){
        return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody().getSubject();
    }
    //kiểm tra tính hợp lệ của token JWT bằng cách xác minh chữ ký và xác thực thông tin trong token
    public boolean validateToken(String token){
        try {
            Jwts.parser().setSigningKey(secret).parseClaimsJws(token);
            return true;
        } catch (MalformedJwtException e) {
            logger.error("Token JWT không hợp lệ: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            logger.error("Token JWT không được hỗ trợ: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            logger.error("Token JWT đã hết hạn: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            logger.error("Token JWT trống hoặc không hợp lệ: {}", e.getMessage());
        } catch (SignatureException e) {
            logger.error("Lỗi khi xác thực chữ ký của token JWT: {}", e.getMessage());
        }
        return false;
    }
}
