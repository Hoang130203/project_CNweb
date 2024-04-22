package com.example.backend.backend.Security;


import com.example.backend.backend.Entity.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

//lớp để xác thực người dùng qua spring security, implement interface Userdetails của spring security
public class AuthUser implements UserDetails {
    private String userName;
    private String password;
    private Collection<? extends GrantedAuthority> authorities;

    //Khởi tạo
    public AuthUser(String userName, String password,
                    Collection<? extends GrantedAuthority> authorities){
        this.userName=userName;
        this.password=password;
        this.authorities=authorities;

    }
    //build đối tượng AuthUser từ đối tượng người dùng gốc
    public static AuthUser build(User user){
        List<GrantedAuthority> authorities = user.getRoles().stream().map(role-> new SimpleGrantedAuthority(role.getName().name())).collect(Collectors.toList());
        return new AuthUser(user.getAccount(), user.getPassword(), authorities);
    }


    //Các phương thức khác
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return userName;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}
