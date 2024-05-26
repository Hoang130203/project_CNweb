package com.example.backend.backend.AuthController;
import com.example.backend.backend.Entity.Enum_Key.ERole;
import com.example.backend.backend.Entity.Notification;
import com.example.backend.backend.Entity.Role;
import com.example.backend.backend.Entity.User;
import com.example.backend.backend.Payload.Request.LoginUser;
import com.example.backend.backend.Payload.Request.ProviderRegister;
import com.example.backend.backend.Payload.Request.RegisterUser;
import com.example.backend.backend.Payload.Response.Email;
import com.example.backend.backend.Payload.Response.Message;
import com.example.backend.backend.Payload.Response.NotificationMessage;
import com.example.backend.backend.Payload.User.UserInfo;
import com.example.backend.backend.Repository.NotificationRepository;
import com.example.backend.backend.Security.CookieUtil;
import com.example.backend.backend.Security.JwtProvider;
import com.example.backend.backend.Service.RoleService;
import com.example.backend.backend.Service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.*;

//Api liên quan đăng nhập và đăng ký
@RestController
//path gốc của api
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private ModelMapper modelMapper;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final UserService userService;
    private final RoleService roleService;
    private final JwtProvider jwtProvider;
    private final NotificationRepository notificationRepository;
    private final String bearerToken="eyJ0eXAiOiJKV1QiLCJub25jZSI6ImdpLTd3U0ZWQlpWQzA3UmlZcnBIUkY1dEJ3Zl9lOGo4S3E4VFloNWJNZEkiLCJhbGciOiJSUzI1NiIsIng1dCI6IkwxS2ZLRklfam5YYndXYzIyeFp4dzFzVUhIMCIsImtpZCI6IkwxS2ZLRklfam5YYndXYzIyeFp4dzFzVUhIMCJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC8wNmYxYjg5Zi0wN2U4LTQ2NGYtYjQwOC1lYzFiNDU3MDNmMzEvIiwiaWF0IjoxNzE2NzEzMzY3LCJuYmYiOjE3MTY3MTMzNjcsImV4cCI6MTcxNjgwMDA2NywiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IkFUUUF5LzhXQUFBQTdFdnlIRlNkOHNhL3hOMGFiU0grWWwwNkYxU1VmTlhBbStDYUorYlJOV3ZhUTJJWGtoSmtMUm9aS2ZPbmRaVlkiLCJhbXIiOlsicHdkIl0sImFwcF9kaXNwbGF5bmFtZSI6IkdyYXBoIEV4cGxvcmVyIiwiYXBwaWQiOiJkZThiYzhiNS1kOWY5LTQ4YjEtYThhZC1iNzQ4ZGE3MjUwNjQiLCJhcHBpZGFjciI6IjAiLCJpZHR5cCI6InVzZXIiLCJpcGFkZHIiOiIyNDA1OjQ4MDI6MWQ2ODpjYzA6OGRjNzo4YTA3OjIyZDplNWE1IiwibmFtZSI6Ik1haSBNaW5oIEhvYW5nIDIwMjE1MzgxIiwib2lkIjoiMDUxOWIyZTMtZGY4MC00YjM0LWE5NDktN2E0NDIxMzYxN2M3Iiwib25wcmVtX3NpZCI6IlMtMS01LTIxLTI3NDYyNTEwMDctMTMyNDU5NTIwNi03ODE2NTQzNTEtODgzNzYiLCJwbGF0ZiI6IjMiLCJwdWlkIjoiMTAwMzIwMDE4NTIzM0QxQSIsInJoIjoiMC5BWElBbjdqeEJ1Z0hUMGEwQ093YlJYQV9NUU1BQUFBQUFBQUF3QUFBQUFBQUFBRERBS00uIiwic2NwIjoiRmlsZXMuUmVhZCBGaWxlcy5SZWFkLkFsbCBGaWxlcy5SZWFkV3JpdGUgRmlsZXMuUmVhZFdyaXRlLkFsbCBNYWlsLlJlYWQgTWFpbC5SZWFkQmFzaWMgTWFpbC5SZWFkV3JpdGUgTWFpbC5TZW5kIG9wZW5pZCBwcm9maWxlIFNpdGVzLlJlYWQuQWxsIFNpdGVzLlJlYWRXcml0ZS5BbGwgVGFza3MuUmVhZCBUYXNrcy5SZWFkV3JpdGUgVGVhbS5SZWFkQmFzaWMuQWxsIFVzZXIuUmVhZCBVc2VyLlJlYWRCYXNpYy5BbGwgVXNlci5SZWFkV3JpdGUgZW1haWwiLCJzaWduaW5fc3RhdGUiOlsia21zaSJdLCJzdWIiOiJxSzBHby1LNFZwc3l1ZkxKT3Q4QzR1U2lMdDY0TlNUUmg0RUhsMGNvRXRJIiwidGVuYW50X3JlZ2lvbl9zY29wZSI6IkFTIiwidGlkIjoiMDZmMWI4OWYtMDdlOC00NjRmLWI0MDgtZWMxYjQ1NzAzZjMxIiwidW5pcXVlX25hbWUiOiJIb2FuZy5NTTIxNTM4MUBzaXMuaHVzdC5lZHUudm4iLCJ1cG4iOiJIb2FuZy5NTTIxNTM4MUBzaXMuaHVzdC5lZHUudm4iLCJ1dGkiOiJIcjVmNC1MWU1reTd0ZlhOd0JaUUFBIiwidmVyIjoiMS4wIiwid2lkcyI6WyJiNzlmYmY0ZC0zZWY5LTQ2ODktODE0My03NmIxOTRlODU1MDkiXSwieG1zX2NjIjpbIkNQMSJdLCJ4bXNfc3NtIjoiMSIsInhtc19zdCI6eyJzdWIiOiI1WTNsRGhLZmNRbkxiN0ExemtKSF9ibDBwSm1vekszYWtBeU16MVFhVWxRIn0sInhtc190Y2R0IjoxNTAyODcxMTQyfQ.MwbAQldka7_yiaT5weV-pUpyKF3ijPpLqlhEuWkW_jP1G37kVao1Kc4EVNBESX7tUttyYp8lT95CvztKd8vJtZhwR0WAGzQ-lfeg199jv7TUdGB_fboPhWbsIbEGNMubYEi2U5meYh6rLd4ZswZpWvKaWSAGaheAnHpAl-gDO0IzjEyBWWNAROQoWj8DUeSwzS1RSzSfHO7fNDNjLVSTebAPxKieU3SjkMPZ4iIYXBjvCEuIzVaj7dqb7sYZO96sd_zQ_m48Dmhz5gNRRi4pTG6fq2R1EKXrK3YO7lU6XAEl8lI1PIv6AH30B_HrPIq-2fCCTkIMef_wSfFreWIKIw";
    @Value("${jwt.accessTokenCookieName}")
    //lấy giá trị từ tệp properties
    private String cookieName;
    @Autowired
    private SimpMessageSendingOperations messagingTemplate;

    //Khởi tạo
    @Autowired
    public AuthController(AuthenticationManager authenticationManager, PasswordEncoder passwordEncoder,
                          UserService userService, RoleService roleService, JwtProvider jwtProvider, NotificationRepository notificationRepository) {
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
        this.userService = userService;
        this.roleService = roleService;
        this.jwtProvider = jwtProvider;
        this.notificationRepository = notificationRepository;
    }

//    @GetMapping("/resetPass")
//    public void reset(){
//        User user=userService.getById("13824").get();
//        user.setPassword(passwordEncoder.encode(userService.getById("13824").get().getAccount()));
//        userService.save(user);
//    }

    //Đăng nhập thường
    @PostMapping("/login")
    public ResponseEntity<Object> login(HttpServletResponse httpServletResponse, @Valid @RequestBody LoginUser loginUser, BindingResult bidBindingResult) {
        if (bidBindingResult.hasErrors())
            return new ResponseEntity<>(new Message("Xảy ra lỗi gì đó"), HttpStatus.BAD_REQUEST);
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginUser.getAccount(), loginUser.getPassword())
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtProvider.generateToken(authentication);
            CookieUtil.create(httpServletResponse, cookieName, jwt, true, -1, "");
            Optional<User> userOptional= userService.getByAccount(loginUser.getAccount());
            UserInfo userBaseInfo= modelMapper.map(userOptional.get(),UserInfo.class);
            return new ResponseEntity<>(userBaseInfo, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new Message("Lỗi rồi!"), HttpStatus.BAD_REQUEST);
        }
    }

    //Không liên quan
    @GetMapping("/createRole")
    public ResponseEntity<?> createRole() {
        Optional<Role> role1 = roleService.getByName(ERole.ROLE_USER);
        Optional<Role> role2 = roleService.getByName(ERole.ROLE_ADMIN);
        Optional<Role> role3 = roleService.getByName(ERole.ROLE_STAFF);
        Optional<Role> role4 = roleService.getByName(ERole.ROLE_SHIPPER);
        if (!role1.isPresent() && !role2.isPresent()) {
            roleService.createRole();
            return ResponseEntity.ok("created");
        }

        return ResponseEntity.ok("existed");
    }

    //Đăng ký thường
    @PostMapping("/register")
    public ResponseEntity<?> Register(@RequestBody RegisterUser registerUser) {

        Optional<User> findUser = userService.getByAccount(registerUser.getAccount());
        if (findUser.isPresent()) {
            return ResponseEntity.badRequest().body(new Message("Tai khoan da ton tai!"));
        }

        User user = new User();
        user.setId(randomString());
        user.setAccount(registerUser.getAccount());
        user.setPassword(passwordEncoder.encode(registerUser.getPassword()));
        user.setEmail(registerUser.getEmail());
        user.setName(registerUser.getName());
        Set<Role> roles = new HashSet<>();
        roles.add(roleService.getByName(ERole.ROLE_USER).get());
        if (registerUser.getRoles().contains("admin")) {
            roles.add(roleService.getByName(ERole.ROLE_ADMIN).get());
        }
        user.setRoles(roles);
        userService.save(user);
        NotificationMessage notificationMessage= new NotificationMessage("1 tài khoản vừa được đăng ký",new Date(),"System",true);
        messagingTemplate.convertAndSend("/topic-admin", notificationMessage);
        Notification notification= new Notification(new java.sql.Date(System.currentTimeMillis()), notificationMessage.getContent(), user,0,true,false);
        notificationRepository.save(notification);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    //Đăng nhập / đăng ký bằng tài khoản mxh
    @PostMapping("/providerAuth")
    public ResponseEntity<?> providerRegister(HttpServletResponse httpServletResponse, @RequestBody ProviderRegister providerRegister) {
        Optional<User> user = userService.getById(providerRegister.getId());
        if (user.isPresent() && user.get().isHasProvider() == true) {
            try {
//            User u= user.get();
                Authentication authentication = authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(user.get().getAccount(), user.get().getAccount())
                );

                SecurityContextHolder.getContext().setAuthentication(authentication);
                String jwt = jwtProvider.generateToken(authentication);
                CookieUtil.create(httpServletResponse, cookieName, jwt, true, -1, "");
//                Optional<User> userOptional= userService.getByAccount(loginUser.getAccount());
                UserInfo userBaseInfo= modelMapper.map(user.get(),UserInfo.class);
                return new ResponseEntity<>(userBaseInfo, HttpStatus.OK);
            } catch (Exception e) {
                return new ResponseEntity<>(new Message("Lỗi rồi!"), HttpStatus.BAD_REQUEST);
            }
        } else if (!user.isPresent()) {
            User newuser = new User();
            newuser.setId(providerRegister.getId());
            String account = randomString();
            newuser.setAccount(account);
            newuser.setHasProvider(true);
            newuser.setPassword(passwordEncoder.encode(account));
            newuser.setAvatar(providerRegister.getAvatar());
            newuser.setEmail(providerRegister.getEmail());
            newuser.setName(providerRegister.getName());
            Set<Role> roles = new HashSet<>();
            roles.add(roleService.getByName(ERole.ROLE_USER).get());
            newuser.setRoles(roles);
            userService.save(newuser);
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(newuser.getAccount(), newuser.getAccount())
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtProvider.generateToken(authentication);
            CookieUtil.create(httpServletResponse, cookieName, jwt, true, -1, "");
            return new ResponseEntity<>(newuser, HttpStatus.OK);
//            return new ResponseEntity<>(newuser,HttpStatus.CREATED);
        }
        return ResponseEntity.badRequest().body("error");
    }


    //quên mật khẩu, gửi tài khoản và mật khẩu được tạo mới gửi tới email người dùng đăng ký
    //1 email có thể có nhiều tài khoản

    @GetMapping("/forgotPassword")
    public ResponseEntity<?> sendNewPasswordToEmail(@RequestParam("email") String emailAddres,@RequestParam("account") String account)
    {
        User user= userService.getByAccount(account)
                .orElseThrow(()-> new RuntimeException("user not found"));
//        List<User> users= userService.getAllByEmail(emailAddres);
        if(user==null || !user.getEmail().equals(emailAddres)){
            return ResponseEntity.ok(new Message("email not found"));
        }else{
            // Tạo đối tượng EmailMessage
            Email emailMessage = new Email();

            // Thiết lập subject
            emailMessage.getMessage().setSubject("Reset mật khẩu shop w15Store");

            // Thiết lập body
            Email.Body body = new Email.Body();
            body.setContentType("Text");
            String content= "";

            if(user.isHasProvider()){
                return ResponseEntity.ok("");
            }
            String newPass= randomString();
            user.setPassword(passwordEncoder.encode(newPass));
            content+="Tài khoản: "+user.getAccount()+", Mật khẩu mới "+newPass+"\n";
            userService.save(user);

            body.setContent(content);
            emailMessage.getMessage().setBody(body);

            // Thiết lập toRecipients
            Email.Recipient recipient = new Email.Recipient();
            Email.EmailAddress emailAddress = new Email.EmailAddress();
            emailAddress.setAddress(emailAddres);
            recipient.setEmailAddress(emailAddress);
            emailMessage.getMessage().setToRecipients(List.of(recipient));

            // Thiết lập saveToSentItems
            emailMessage.setSaveToSentItems(true);
// Tạo đối tượng RestTemplate
            RestTemplate restTemplate = new RestTemplate();

            // Tạo header chứa bearer token
            HttpHeaders headers = new HttpHeaders();
            headers.setBearerAuth(bearerToken);
            headers.setContentType(MediaType.APPLICATION_JSON);
            // Chuyển đối tượng EmailMessage thành chuỗi JSON
            String requestBody;
            try {
                ObjectMapper objectMapper = new ObjectMapper();
                requestBody = objectMapper.writeValueAsString(emailMessage);
                HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);
                // Gửi yêu cầu POST
                ResponseEntity<String> responseEntity = restTemplate.exchange(
                        "https://graph.microsoft.com/v1.0/me/sendMail",
                        HttpMethod.POST,
                        requestEntity,
                        String.class);

                // Kiểm tra mã trạng thái phản hồi
                if (responseEntity.getStatusCode() == HttpStatus.OK) {
                    System.out.println("Email sent successfully.");
                } else {
                    System.out.println("Failed to send email. Status code: " + responseEntity.getStatusCode());
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
            // Tạo đối tượng HttpEntity chứa header và body

            // In ra đối tượng EmailMessage
            System.out.println(emailMessage);

            return ResponseEntity.ok(new Message("success"));
        }
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
