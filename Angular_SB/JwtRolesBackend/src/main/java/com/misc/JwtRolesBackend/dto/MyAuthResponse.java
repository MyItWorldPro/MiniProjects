package com.misc.JwtRolesBackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MyAuthResponse {

    private String myusername;
    private String mytoken;

}
