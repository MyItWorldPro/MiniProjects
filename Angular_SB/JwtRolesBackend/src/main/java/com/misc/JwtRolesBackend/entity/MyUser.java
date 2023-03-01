package com.misc.JwtRolesBackend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "my_user")
public class MyUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int myid;

    private String myname;

    @Column(unique=true)
    private String myusername;

    private String mypassword;

    private String myroles;

}
