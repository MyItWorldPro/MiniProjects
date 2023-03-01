package com.misc.JwtRolesBackend.service;

import com.misc.JwtRolesBackend.dto.MyAuthRequest;
import com.misc.JwtRolesBackend.dto.MyAuthResponse;
import com.misc.JwtRolesBackend.entity.MyUser;
import com.misc.JwtRolesBackend.repository.MyUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MyUserService {

    @Autowired
    private MyUserRepository myUserRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public boolean isUserNameAlreadyExists(String userName) {
        boolean alreadyExists = Boolean.FALSE;
        Optional<MyUser> user = myUserRepository.findByMyusername(userName);
        if (user.isPresent()) {
            alreadyExists = Boolean.TRUE;
        }
        return alreadyExists;
    }

    public MyAuthResponse saveMyUser(MyAuthRequest myAuthRequest, String jwtToken) {
        MyUser myUser = new MyUser();
        myUser.setMyusername(myAuthRequest.getMyusername());
        myUser.setMypassword(bCryptPasswordEncoder.encode(myAuthRequest.getMypassword()));

        //TO DO - Change the below logic as per business requirements
        if (myAuthRequest.getMyusername().contains("admin")) {
            myUser.setMyroles("ADMIN");
        } else {
            myUser.setMyroles("USER");
        }
        myUserRepository.save(myUser);

        MyAuthResponse myAuthResponse = new MyAuthResponse();
        myAuthResponse.setMyusername(myAuthRequest.getMyusername());
        myAuthResponse.setMytoken(jwtToken);
        return myAuthResponse;
    }

}
