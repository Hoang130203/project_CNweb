package com.example.backend.backend.AuthController;

import com.example.backend.backend.Entity.Enum_Key.ERole;
import com.example.backend.backend.Entity.Role;
import com.example.backend.backend.Entity.User;
import com.example.backend.backend.Payload.Request.LoginUser;
import com.example.backend.backend.Payload.Request.ProviderRegister;
import com.example.backend.backend.Payload.Request.RegisterUser;
import com.example.backend.backend.Payload.Response.Message;
import com.example.backend.backend.Security.CookieUtil;
import com.example.backend.backend.Security.JwtProvider;
import com.example.backend.backend.Service.RoleService;
import com.example.backend.backend.Service.UserService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Optional;
import java.util.Random;
import java.util.Set;

//Api liên quan đăng nhập và đăng ký
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final UserService userService;
    private final RoleService roleService;
    private final JwtProvider jwtProvider;
    @Value("${jwt.accessTokenCookieName}")
    private String cookieName;

    //Khởi tạo
    @Autowired
    public AuthController(AuthenticationManager authenticationManager, PasswordEncoder passwordEncoder,
                          UserService userService, RoleService roleService, JwtProvider jwtProvider) {
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
        this.userService = userService;
        this.roleService = roleService;
        this.jwtProvider = jwtProvider;
    }
    //Đăng nhập thường
    @PostMapping("/login")
    public ResponseEntity<Object> login(HttpServletResponse httpServletResponse, @Valid @RequestBody LoginUser loginUser, BindingResult bidBindingResult){
        if(bidBindingResult.hasErrors())
            return new ResponseEntity<>(new Message("Xảy ra lỗi gì đó"), HttpStatus.BAD_REQUEST);
        try {
            Authentication authentication= authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginUser.getAccount(),loginUser.getPassword())
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtProvider.generateToken(authentication);
            CookieUtil.create(httpServletResponse,cookieName,jwt,false,-1,"");
            return new ResponseEntity<>(jwt, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new Message("Lỗi rồi!"), HttpStatus.BAD_REQUEST);
        }
    }
    //Không liên quan
    @GetMapping("/createRole")
    public ResponseEntity<?> createRole(){
        Optional<Role> role1= roleService.getByName(ERole.ROLE_USER);
        Optional<Role> role2= roleService.getByName(ERole.ROLE_ADMIN);
        Optional<Role> role3= roleService.getByName(ERole.ROLE_STAFF);
        Optional<Role> role4= roleService.getByName(ERole.ROLE_SHIPPER);
        if(!role1.isPresent()&& !role2.isPresent()){
            roleService.createRole();
            return ResponseEntity.ok("created");
        }

        return ResponseEntity.ok("existed");
    }
    //Đăng ký thường
    @PostMapping("/register")
    public ResponseEntity<?> Register(@RequestBody RegisterUser registerUser){

        Optional<User> findUser = userService.getByAccount(registerUser.getAccount());
        if(findUser.isPresent()){
            return ResponseEntity.badRequest().body(new Message("Tai khoan da ton tai!"));
        }

        User user = new User();
        user.setId(randomString());
        user.setAccount(registerUser.getAccount());
        user.setPassword(passwordEncoder.encode(registerUser.getPassword()));
        user.setEmail(registerUser.getEmail());
        user.setName(registerUser.getName());
        Set<Role> roles= new HashSet<>();
        roles.add(roleService.getByName(ERole.ROLE_USER).get());
        if(registerUser.getRoles().contains("admin")){
            roles.add(roleService.getByName(ERole.ROLE_ADMIN).get());
        }
        user.setRoles(roles);
        userService.save(user);
        return new ResponseEntity<>(user,HttpStatus.CREATED);
    }
    //Đăng nhập / đăng ký bằng tài khoản mxh
    @PostMapping("/providerAuth")
    public ResponseEntity<?> providerRegister(HttpServletResponse httpServletResponse,@RequestBody ProviderRegister providerRegister){
        Optional<User> user = userService.getById(providerRegister.getId());
        if(user.isPresent() && user.get().isHasProvider()==true){
            try {
//            User u= user.get();
                Authentication authentication= authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(user.get().getAccount(),user.get().getAccount())
                );

                SecurityContextHolder.getContext().setAuthentication(authentication);
                String jwt = jwtProvider.generateToken(authentication);
                CookieUtil.create(httpServletResponse,cookieName,jwt,true,-1,"");
                return new ResponseEntity<>(new Message("Bạn đã đăng nhập"), HttpStatus.OK);
            } catch (Exception e) {
                return new ResponseEntity<>(new Message("Lỗi rồi!"), HttpStatus.BAD_REQUEST);
            }
        }else if(!user.isPresent()){
            User newuser= new User();
            newuser.setId(providerRegister.getId());
            String account= randomString();
            newuser.setAccount(account);
            newuser.setHasProvider(true);
            newuser.setPassword(passwordEncoder.encode(account));
            newuser.setAvatar(providerRegister.getAvatar());
            newuser.setEmail(providerRegister.getEmail());
            newuser.setName(providerRegister.getName());
            Set<Role> roles= new HashSet<>();
            roles.add(roleService.getByName(ERole.ROLE_USER).get());
            newuser.setRoles(roles);
            userService.save(newuser);
            Authentication authentication= authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(newuser.getAccount(),newuser.getAccount())
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtProvider.generateToken(authentication);
            CookieUtil.create(httpServletResponse,cookieName,jwt,true,-1,"");
            return new ResponseEntity<>(new Message("Bạn đã đăng ký, đăng nhập thành công"), HttpStatus.OK);
//            return new ResponseEntity<>(newuser,HttpStatus.CREATED);
        }
        return ResponseEntity.badRequest().body("error");
    }

    //lây thông tin người dùng đã đăng nhập
    @GetMapping("/details")
    public ResponseEntity<Object> getUserDetails(){
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        String userName = userDetails.getUsername();
        Optional<User> user= this.userService.getByAccount(userName);
        if (!user.isPresent()) {
            return new ResponseEntity<>(new Message("No info"), HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(roleService.getByUser(user.get()), HttpStatus.OK) ;
    }
    public String randomString(){
        int length=15;
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        Random random = new Random();

        // Khai báo một StringBuilder để xây dựng xâu ngẫu nhiên
        StringBuilder sb = new StringBuilder();

        // Tạo xâu ngẫu nhiên bằng cách chọn ngẫu nhiên các ký tự từ chuỗi characters
        for (int i = 0; i < length; i++) {
            int index = random.nextInt(characters.length());
            char randomChar = characters.charAt(index);
            sb.append(randomChar);
        }

        // In ra xâu ngẫu nhiên
        String randomString = sb.toString();
        return randomString;
    }
}
