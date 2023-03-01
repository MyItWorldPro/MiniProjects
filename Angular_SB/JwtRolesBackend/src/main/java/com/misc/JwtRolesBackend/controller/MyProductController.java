package com.misc.JwtRolesBackend.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/product")
public class MyProductController {

    @GetMapping("/helloworldproduct")
    @PreAuthorize("hasAuthority('ADMIN')")
    public String helloworldproduct() {
        return "Hello World Product is a secured endpoint.";
    }

    @GetMapping("/admin_only_endpoint")
    @PreAuthorize("hasAuthority('ADMIN')")
    public String admin_only_endpoint() {
        return "admin_only_endpoint hit.";
    }

    @GetMapping("/user_only_endpoint")
    @PreAuthorize("hasAuthority('USER')")
    public String user_only_endpoint() {
        return "user_only_endpoint hit.";
    }

    @GetMapping("/admin_and_user_endpoint")
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('USER')")
    public String admin_and_user_endpoint() {
        return "admin_and_user_endpoint hit.";
    }

}
