package com.example.backend.backend.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "users")
@Getter @Setter
@NoArgsConstructor
public class User {
    @Id
    @Column(name = "id",columnDefinition = "varchar(70)")
    private String id;

    @Column(name = "account",columnDefinition = "varchar(50)")
    @JsonIgnore
    private String account;

    @Column(name = "password",columnDefinition = "varchar(70)")
    @JsonIgnore
    private String password;

    @JsonIgnore
    @Column(name = "email",columnDefinition = "varchar(70)")
    private String email;


    @Column(name = "has_provider")
    private boolean hasProvider;

    @Column(name = "avatar",columnDefinition = "text")
    private String avatar;

    @Column(name="name",columnDefinition = "text")
    private String name;

    @JsonIgnore
    @Column(name = "age")
    private int age;

    @Column(name = "address",columnDefinition = "text")
    private  String address;

    @Column(name = "phone",columnDefinition = "varchar(12)")
    private String phone;

    @JsonIgnore
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_role",joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles=new HashSet<>();

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL,mappedBy = "user")
    private List<Order> orders=new ArrayList<>();
    public User(@NotNull String userName, @NotNull String email, @NotNull String password) {
        this.account = userName;
        this.email = email;
        this.password = password;
    }

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL,mappedBy = "user")
    private List<Cart> carts =new ArrayList<>();

    @JsonIgnore
    @Column(name = "message_count")
    private int messageCount;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL,mappedBy = "user")
    private List<Message> messages =new ArrayList<>();

    @Override
    public String toString() {
        return "User{" +
                "id='" + id + '\'' +
                ", account='" + account + '\'' +
                ", password='" + password + '\'' +
                ", email='" + email + '\'' +
                ", hasProvider=" + hasProvider +
                ", avatar='" + avatar + '\'' +
                ", name='" + name + '\'' +
                ", roles=" + roles +
                '}';
    }
}
