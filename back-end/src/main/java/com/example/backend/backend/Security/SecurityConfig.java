package com.example.backend.backend.Security;

import com.example.backend.backend.Entity.Enum_Key.ERole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.server.Cookie;
import org.springframework.boot.web.servlet.server.CookieSameSiteSupplier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.session.SessionRegistryImpl;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.session.HttpSessionEventPublisher;
import org.springframework.web.cors.CorsConfiguration;

import java.util.List;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
//class cấu hình bảo mật chính
public class SecurityConfig {
    @Autowired
    //Xử lý ngoại lệ cho jwt
    private JwtException jwtException;

    //bật chế độ samesite=none cho cookie,đồng ý cho phép máy chủ khác tên miền lưu trữ cookie
    @Bean
    public CookieSameSiteSupplier applicationCookieSameSiteSupplier() {
        return CookieSameSiteSupplier.of(Cookie.SameSite.NONE);
    }

    //Đối tượng JwtTokenFilter
    @Bean
    public JwtTokenFilter jwtTokenFilter(){
        return new JwtTokenFilter();
    }

    //Mã hóa mật khẩu
    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    //Đối tượng quản lý xác thực
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception{
        return authenticationConfiguration.getAuthenticationManager();
    }


    //Đối tượng lọc các request tới ứng dụng spring boot
    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        http.headers().frameOptions().disable().and()
//                cors(cors->cors.notifyAll())
                .cors().configurationSource(request -> {
            CorsConfiguration configuration= new CorsConfiguration();
            configuration.setAllowedOrigins(List.of("http://localhost:3000","https://project-c-nweb.vercel.app"));
            configuration.setAllowedMethods(List.of("HEAD", "GET", "POST", "PUT", "DELETE", "PATCH","OPTIONS"));
            configuration.setAllowCredentials(true);
            configuration.addExposedHeader("Message");
            configuration.setAllowedHeaders(List.of("Authorization", "Cache-Control", "Content-Type"));
            return configuration;
        })
                .and()
                .csrf().disable()
//            .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests((authorize) -> authorize
                        .requestMatchers(HttpMethod.POST,"/api/auth/**").permitAll()
                        .requestMatchers("/h2-console/**").permitAll()
                        .requestMatchers("/h2-console/login.do").permitAll()
                        .requestMatchers("/api/auth/createRole").permitAll()
                        .requestMatchers(HttpMethod.GET,"/api/product/**").permitAll()
                        .requestMatchers("/api/user/**").hasRole("USER")
                        .requestMatchers("/vnpay/**").permitAll()
                        .requestMatchers(HttpMethod.GET,"/vnpay/**").permitAll()
                        .requestMatchers(HttpMethod.GET,"/ws/**").permitAll()
                        .requestMatchers(HttpMethod.GET,"/api/test").permitAll()
                        .requestMatchers(HttpMethod.GET,"/api/userId").hasRole("USER")
                        .anyRequest().authenticated()
                )
                .exceptionHandling((exceptions) -> exceptions.authenticationEntryPoint(jwtException))
                .sessionManagement((session) -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
    @Bean
    public SessionRegistry sessionRegistry()
    {
        return new SessionRegistryImpl();
    }
    @Bean
    public HttpSessionEventPublisher httpSessionEventPublisher(){
        return new HttpSessionEventPublisher();
    }
}
