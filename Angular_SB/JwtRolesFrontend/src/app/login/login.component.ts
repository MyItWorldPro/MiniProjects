import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, MyAuthRequest, MyAuthResponse } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  myAuthRequest = {} as MyAuthRequest;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  login(): void {
    if (this.form.controls['username'].value != '' && this.form.controls['password'].value != '') {
      this.myAuthRequest.myusername = this.form.controls['username'].value;
      this.myAuthRequest.mypassword = this.form.controls['password'].value;

      this.authService.logIn(this.myAuthRequest).subscribe((resp: MyAuthResponse) => {
        if (null != resp && null != resp.mytoken) {
          localStorage.setItem('mytoken', resp.mytoken);
          localStorage.setItem('myroles', resp.myroles);
          
          //localStorage.setItem("token_expires_at", JSON.stringify(expiresAt.valueOf()));
          //after successful authentication redirect to homepage
          this.router.navigate(['home']);
        }
      });
    }
  }

}
