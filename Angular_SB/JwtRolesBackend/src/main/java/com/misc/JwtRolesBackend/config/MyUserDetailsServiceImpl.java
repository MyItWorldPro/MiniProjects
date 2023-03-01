package com.misc.JwtRolesBackend.config;

import com.misc.JwtRolesBackend.entity.MyUser;
import com.misc.JwtRolesBackend.repository.MyUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;

@Configuration
public class MyUserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private MyUserRepository myUserRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<MyUser> userInfo = myUserRepository.findByMyusername(username);
        return userInfo.map(MyUserDetailsImpl::new)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
    }

}
