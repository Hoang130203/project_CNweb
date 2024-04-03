package com.example.backend.backend.AuthController;

import com.example.backend.backend.Entity.Enum_Key.ERole;
import com.example.backend.backend.Entity.Role;
import com.example.backend.backend.Entity.User;
import com.example.backend.backend.Payload.Request.LoginUser;
import com.example.backend.backend.Payload.Request.ProviderRegister;
import com.example.backend.backend.Payload.Request.RegisterUser;
import com.example.backend.backend.Payload.Response.Email;
import com.example.backend.backend.Payload.Response.Message;
import com.example.backend.backend.Security.CookieUtil;
import com.example.backend.backend.Security.JwtProvider;
import com.example.backend.backend.Service.RoleService;
import com.example.backend.backend.Service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
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
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final UserService userService;
    private final RoleService roleService;
    private final JwtProvider jwtProvider;
    private final String bearerToken="eyJ0eXAiOiJKV1QiLCJub25jZSI6InlUZXRVUG1SdmxZdTZpdWgwaFBGMVB5Z2JhS1l6elNaTElQdDR0MG93dHMiLCJhbGciOiJSUzI1NiIsIng1dCI6IlhSdmtvOFA3QTNVYVdTblU3Yk05blQwTWpoQSIsImtpZCI6IlhSdmtvOFA3QTNVYVdTblU3Yk05blQwTWpoQSJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC8wNmYxYjg5Zi0wN2U4LTQ2NGYtYjQwOC1lYzFiNDU3MDNmMzEvIiwiaWF0IjoxNzExODgxNzk3LCJuYmYiOjE3MTE4ODE3OTcsImV4cCI6MTcxMTk2ODQ5NywiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IkFUUUF5LzhXQUFBQVNJcWVneWpxamZBcUpBL2d4ejZIT3VoSFlmSDNVWG43MW5INFRXeWoxK3gyUzFXRENVUkhCeDR0OUNBclA0VjgiLCJhbXIiOlsicHdkIl0sImFwcF9kaXNwbGF5bmFtZSI6IkdyYXBoIEV4cGxvcmVyIiwiYXBwaWQiOiJkZThiYzhiNS1kOWY5LTQ4YjEtYThhZC1iNzQ4ZGE3MjUwNjQiLCJhcHBpZGFjciI6IjAiLCJpZHR5cCI6InVzZXIiLCJpcGFkZHIiOiIyNDA1OjQ4MDI6MWQ3ZToxMTcwOjIwMGU6NDYzOTo1ZWZkOjViZTYiLCJuYW1lIjoiTWFpIE1pbmggSG9hbmcgMjAyMTUzODEiLCJvaWQiOiIwNTE5YjJlMy1kZjgwLTRiMzQtYTk0OS03YTQ0MjEzNjE3YzciLCJvbnByZW1fc2lkIjoiUy0xLTUtMjEtMjc0NjI1MTAwNy0xMzI0NTk1MjA2LTc4MTY1NDM1MS04ODM3NiIsInBsYXRmIjoiMyIsInB1aWQiOiIxMDAzMjAwMTg1MjMzRDFBIiwicmgiOiIwLkFYSUFuN2p4QnVnSFQwYTBDT3diUlhBX01RTUFBQUFBQUFBQXdBQUFBQUFBQUFEREFLTS4iLCJzY3AiOiJGaWxlcy5SZWFkIEZpbGVzLlJlYWQuQWxsIEZpbGVzLlJlYWRXcml0ZSBGaWxlcy5SZWFkV3JpdGUuQWxsIE1haWwuUmVhZCBNYWlsLlJlYWRCYXNpYyBNYWlsLlJlYWRXcml0ZSBNYWlsLlNlbmQgb3BlbmlkIHByb2ZpbGUgU2l0ZXMuUmVhZC5BbGwgU2l0ZXMuUmVhZFdyaXRlLkFsbCBUYXNrcy5SZWFkIFRhc2tzLlJlYWRXcml0ZSBUZWFtLlJlYWRCYXNpYy5BbGwgVXNlci5SZWFkIFVzZXIuUmVhZEJhc2ljLkFsbCBVc2VyLlJlYWRXcml0ZSBlbWFpbCIsInNpZ25pbl9zdGF0ZSI6WyJrbXNpIl0sInN1YiI6InFLMEdvLUs0VnBzeXVmTEpPdDhDNHVTaUx0NjROU1RSaDRFSGwwY29FdEkiLCJ0ZW5hbnRfcmVnaW9uX3Njb3BlIjoiQVMiLCJ0aWQiOiIwNmYxYjg5Zi0wN2U4LTQ2NGYtYjQwOC1lYzFiNDU3MDNmMzEiLCJ1bmlxdWVfbmFtZSI6IkhvYW5nLk1NMjE1MzgxQHNpcy5odXN0LmVkdS52biIsInVwbiI6IkhvYW5nLk1NMjE1MzgxQHNpcy5odXN0LmVkdS52biIsInV0aSI6Im1VTnFSd3I2MkVldk9zQ1VteXM2QUEiLCJ2ZXIiOiIxLjAiLCJ3aWRzIjpbImI3OWZiZjRkLTNlZjktNDY4OS04MTQzLTc2YjE5NGU4NTUwOSJdLCJ4bXNfY2MiOlsiQ1AxIl0sInhtc19zc20iOiIxIiwieG1zX3N0Ijp7InN1YiI6IjVZM2xEaEtmY1FuTGI3QTF6a0pIX2JsMHBKbW96SzNha0F5TXoxUWFVbFEifSwieG1zX3RjZHQiOjE1MDI4NzExNDJ9.in6IMO_GLTS74AS2_DJxpfUh5ROiJbjYZvbmn1DTwkhsLyXrULYyMDD1I_nBifFDIZ-rozu98aAD7MzOmNKQGV9d8YaRpY8BHGdkcg6f3684AF4mdCqUOWL6X4CDKOnvN8c25CbbSoM0h1Y9sK0sU-h8UE2JBPih_qaV3tZJkE1EHspDj6E8CIvLxafwt9G3eDm1nmSygzzcoUG3A9G3jqzch3gbhZ4nP37QOZE53tFKloos8HHI8CI49wOyPjs7YpyaV7ap9IBgHh2Biwprw1yFawm0q3lNK-6EocWrGLW3qylv-ozUCqJ5nfyheulM9a-_jSJ7cZYoxmwz9vDSYA";
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
    public ResponseEntity<Object> login(HttpServletResponse httpServletResponse, @Valid @RequestBody LoginUser loginUser, BindingResult bidBindingResult) {
        if (bidBindingResult.hasErrors())
            return new ResponseEntity<>(new Message("Xảy ra lỗi gì đó"), HttpStatus.BAD_REQUEST);
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginUser.getAccount(), loginUser.getPassword())
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtProvider.generateToken(authentication);
            CookieUtil.create(httpServletResponse, cookieName, jwt, false, -1, "");
            return new ResponseEntity<>(jwt, HttpStatus.OK);
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
                return new ResponseEntity<>(new Message("Bạn đã đăng nhập"), HttpStatus.OK);
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
            return new ResponseEntity<>(new Message("Bạn đã đăng ký, đăng nhập thành công"), HttpStatus.OK);
//            return new ResponseEntity<>(newuser,HttpStatus.CREATED);
        }
        return ResponseEntity.badRequest().body("error");
    }

    @PostMapping("/forgotPassword")
    public ResponseEntity<?> sendNewPasswordToEmail(@RequestParam("email") String emailAddres)
    {
        List<User> users= userService.getAllByEmail(emailAddres);
        if(users.isEmpty()|| users.size()==0){
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
            for (User user:users
                 ) {
                String newPass= randomString();
                user.setPassword(passwordEncoder.encode(newPass));
                content+="Tài khoản: "+user.getAccount()+", Mật khẩu "+newPass+"\n";
                userService.save(user);
            }
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

            return ResponseEntity.ok(emailMessage);
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
