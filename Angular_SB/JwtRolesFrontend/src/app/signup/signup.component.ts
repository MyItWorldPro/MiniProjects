import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, MyAuthRequest, MyAuthResponse } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  myAuthRequest = {} as MyAuthRequest;
  isSignUpSuccessfulFlag: boolean = false;

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
    if (this.signUpForm.controls['username'].value != '' && this.signUpForm.controls['password'].value != '' &&
      this.signUpForm.controls['confirmPassword'].value != '' &&
      this.signUpForm.controls['password'].value === this.signUpForm.controls['confirmPassword'].value) {
      this.myAuthRequest.myusername = this.signUpForm.controls['username'].value;
      this.myAuthRequest.mypassword = this.signUpForm.controls['password'].value;

      this.authService.signUp(this.myAuthRequest).subscribe((resp: MyAuthResponse) => {
        if (null != resp && null != resp.mytoken) {
          this.isSignUpSuccessfulFlag = true;
        }
      });

    }

  }

}
