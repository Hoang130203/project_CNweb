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
    private final String bearerToken="eyJ0eXAiOiJKV1QiLCJub25jZSI6IklHWVV1WW5TMWZjN2NSWnBPM0t6ckczTFFyZjBrSzJxUm1rUnlUYVZ3c2siLCJhbGciOiJSUzI1NiIsIng1dCI6IkwxS2ZLRklfam5YYndXYzIyeFp4dzFzVUhIMCIsImtpZCI6IkwxS2ZLRklfam5YYndXYzIyeFp4dzFzVUhIMCJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC8wNmYxYjg5Zi0wN2U4LTQ2NGYtYjQwOC1lYzFiNDU3MDNmMzEvIiwiaWF0IjoxNzE3MzM3Njg2LCJuYmYiOjE3MTczMzc2ODYsImV4cCI6MTcxNzQyNDM4NiwiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IkFUUUF5LzhXQUFBQXZ3VHM2aitVa29NOUdzd0xnS05jYitKQ0VMdlFRbDBkdmtyQUViRGNPMnFtZnhqMEtCNWtGNk5zSEQ4dmwwQ0kiLCJhbXIiOlsicHdkIl0sImFwcF9kaXNwbGF5bmFtZSI6IkdyYXBoIEV4cGxvcmVyIiwiYXBwaWQiOiJkZThiYzhiNS1kOWY5LTQ4YjEtYThhZC1iNzQ4ZGE3MjUwNjQiLCJhcHBpZGFjciI6IjAiLCJpZHR5cCI6InVzZXIiLCJpcGFkZHIiOiIyNDA1OjQ4MDI6MWQ2ODpjYzA6ZGRlMjo2NTI5OmQ3MGQ6YjBhNiIsIm5hbWUiOiJNYWkgTWluaCBIb2FuZyAyMDIxNTM4MSIsIm9pZCI6IjA1MTliMmUzLWRmODAtNGIzNC1hOTQ5LTdhNDQyMTM2MTdjNyIsIm9ucHJlbV9zaWQiOiJTLTEtNS0yMS0yNzQ2MjUxMDA3LTEzMjQ1OTUyMDYtNzgxNjU0MzUxLTg4Mzc2IiwicGxhdGYiOiIzIiwicHVpZCI6IjEwMDMyMDAxODUyMzNEMUEiLCJyaCI6IjAuQVhJQW43anhCdWdIVDBhMENPd2JSWEFfTVFNQUFBQUFBQUFBd0FBQUFBQUFBQUREQUtNLiIsInNjcCI6IkZpbGVzLlJlYWQgRmlsZXMuUmVhZC5BbGwgRmlsZXMuUmVhZFdyaXRlIEZpbGVzLlJlYWRXcml0ZS5BbGwgTWFpbC5SZWFkIE1haWwuUmVhZEJhc2ljIE1haWwuUmVhZFdyaXRlIE1haWwuU2VuZCBvcGVuaWQgcHJvZmlsZSBTaXRlcy5SZWFkLkFsbCBTaXRlcy5SZWFkV3JpdGUuQWxsIFRhc2tzLlJlYWQgVGFza3MuUmVhZFdyaXRlIFRlYW0uUmVhZEJhc2ljLkFsbCBVc2VyLlJlYWQgVXNlci5SZWFkQmFzaWMuQWxsIFVzZXIuUmVhZFdyaXRlIGVtYWlsIiwic2lnbmluX3N0YXRlIjpbImttc2kiXSwic3ViIjoicUswR28tSzRWcHN5dWZMSk90OEM0dVNpTHQ2NE5TVFJoNEVIbDBjb0V0SSIsInRlbmFudF9yZWdpb25fc2NvcGUiOiJBUyIsInRpZCI6IjA2ZjFiODlmLTA3ZTgtNDY0Zi1iNDA4LWVjMWI0NTcwM2YzMSIsInVuaXF1ZV9uYW1lIjoiSG9hbmcuTU0yMTUzODFAc2lzLmh1c3QuZWR1LnZuIiwidXBuIjoiSG9hbmcuTU0yMTUzODFAc2lzLmh1c3QuZWR1LnZuIiwidXRpIjoidFlUd25SNUhzRXlQclFNN3pLMFlBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il0sInhtc19jYyI6WyJDUDEiXSwieG1zX3NzbSI6IjEiLCJ4bXNfc3QiOnsic3ViIjoiNVkzbERoS2ZjUW5MYjdBMXprSkhfYmwwcEptb3pLM2FrQXlNejFRYVVsUSJ9LCJ4bXNfdGNkdCI6MTUwMjg3MTE0Mn0.KsXRiNX4HT-i1OTK5DypVfV5xPbi4e5GJGflDTUEeGJnJ2h4aZI9jVKa910xweeiUnZYmtkzSETzG0dvQ5pGKzfqgZIZ7ow170uib26leCsvlK7U59p76ZqIC3FzXHlQcLdQzfbwIAV7iWcMPlaZUPgTHdC_JMSIuhj5FIohq_LyvF0BHdQKu0SoZYoVi-mf4tGD-QmMAiuIz25VyoIV2xUXS-udu3100WWYNYmt7L98n4bcnkXFW8E_tA2l013xcRLCs5FbWr_dMjgTtlSyls8Db5E_HaF6ty539HtKwYskngBjeWzBEMalx4IPon39Cr3RupKBrCNExE0o_XWbZQ";
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
            CookieUtil.create(httpServletResponse, cookieName, jwt, true, 3600*7*24, "");
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
                CookieUtil.create(httpServletResponse, cookieName, jwt, true, 3600*7*24, "");
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
