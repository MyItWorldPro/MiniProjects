package com.misc.JwtRolesBackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MyAuthRequest {

    private String myusername;
    private String mypassword;

}
