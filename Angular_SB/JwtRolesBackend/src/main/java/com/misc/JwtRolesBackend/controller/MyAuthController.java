package com.misc.JwtRolesBackend.controller;

import com.misc.JwtRolesBackend.dto.MyAuthRequest;
import com.misc.JwtRolesBackend.dto.MyAuthResponse;
import com.misc.JwtRolesBackend.service.MyJwtService;
import com.misc.JwtRolesBackend.service.MyUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class MyAuthController {

    @Autowired
    private MyJwtService myJwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private MyUserService myUserService;

    @GetMapping("/helloworld")
    public String helloworld() {
        return "Hello World is not a secured endpoint. Anyone can access it !!!";
    }

    @GetMapping("/welcome")
    public String welcome() {
        return "Welcome is not a secured endpoint. Anyone can access it !!!";
    }

    @PostMapping("/signup")
    public ResponseEntity<Object> signup(@RequestBody MyAuthRequest myAuthRequest) {
        //existing users should not be allowed to signup again
        if (!myUserService.isUserNameAlreadyExists(myAuthRequest.getMyusername())) {
            String token = myJwtService.generateTokenFromMyUsername(myAuthRequest.getMyusername());
            return new ResponseEntity<>(myUserService.saveMyUser(myAuthRequest, token), HttpStatus.OK);
        } else {
            return new ResponseEntity<>("User already exists. Please Sign In.", HttpStatus.FORBIDDEN);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody MyAuthRequest myAuthRequest) {
        Authentication authentication = null;
        try {
            authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    myAuthRequest.getMyusername(), myAuthRequest.getMypassword()));
        } catch (AuthenticationException ex) {
            return new ResponseEntity<>("Invalid Credentials!", HttpStatus.FORBIDDEN);
        }
        if (null != authentication && authentication.isAuthenticated()) {
            MyAuthResponse myAuthResponse = new MyAuthResponse();
            myAuthResponse.setMyusername(myAuthRequest.getMyusername());
            myAuthResponse.setMytoken(myJwtService.generateTokenFromMyUsername(myAuthRequest.getMyusername()));
            return new ResponseEntity<>(myAuthResponse, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Invalid Credentials!", HttpStatus.FORBIDDEN);
        }
    }

}
