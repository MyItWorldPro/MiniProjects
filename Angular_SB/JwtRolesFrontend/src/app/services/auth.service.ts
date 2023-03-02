import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Constants } from '../config/constants'

export interface MyAuthRequest {
  myusername: string;
  mypassword: string;
}

export interface MyAuthResponse {
  myusername: string;
  mytoken: string;
  myroles: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private constants: Constants) { }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  /** POST: SignUp a new User */
  signUp(signupReq: MyAuthRequest): Observable<MyAuthResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<MyAuthResponse>(this.constants.BASE_URL_AUTH + this.constants.AUTH_URL_SIGNUP,
      signupReq, httpOptions)
      .pipe(
        catchError(err => this.handleError(err))
      );
  }

  /** POST: LogIn an existing User */
  logIn(loginReq: MyAuthRequest): Observable<MyAuthResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<MyAuthResponse>(this.constants.BASE_URL_AUTH + this.constants.AUTH_URL_LOGIN,
      loginReq, httpOptions)
      .pipe(
        catchError(err => this.handleError(err))
      );
  }

}
