package com.example.backend.backend.Security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.WebUtils;

import java.io.IOException;

//xác thực và xử lý token JWT
public class JwtTokenFilter extends OncePerRequestFilter {
    private static final Logger logger = org.slf4j.LoggerFactory.getLogger(JwtTokenFilter.class);
    @Autowired
    private  JwtProvider jwtProvider;
    @Autowired
    private  UserDetailsServiceImpl userDetailsServiceImpl;
    @Value("${jwt.accessTokenCookieName}")
    private String cookieName;
    @Override
    //kiểm tra token từ yêu cầu và xác thực nó bằng cách sử dụng JwtProvider.
    // Nếu token hợp lệ, tạo một đối tượng UsernamePasswordAuthenticationToken và đặt nó vào SecurityContextHolder để xác thực người dùng
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            String token =getToken(request);
            if(token!=null && jwtProvider.validateToken(token)){
                String account=jwtProvider.getAccountFromToken(token);
                UserDetails userDetails= userDetailsServiceImpl.loadUserByUsername(account);
                UsernamePasswordAuthenticationToken auth= new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(auth);
            }
        } catch (Exception e){
            logger.error(e.getMessage());
        }
        filterChain.doFilter(request, response);
    }
    //Lấy ra token người dùng từ request
    private String getToken(HttpServletRequest request){
        Cookie cookie = WebUtils.getCookie(request,cookieName);
        return cookie!=null?cookie.getValue():null;
    }
}
