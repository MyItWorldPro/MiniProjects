import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, MyAuthRequest } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  myAuthRequest = {} as MyAuthRequest;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.signUpForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  signup(): void {
    this.myAuthRequest.myusername = "my_admin_user";
    this.myAuthRequest.mypassword = "admin";

    this.authService.signUp(this.myAuthRequest).subscribe((resp) => {
      console.log(resp);
    });

  }

}
