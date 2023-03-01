import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Constants {

  constructor() { }

  public readonly BASE_URL_AUTH: string = 'http://localhost:8181/auth';
  public readonly AUTH_URL_SIGNUP: string = '/signup';
  public readonly AUTH_URL_LOGIN: string = '/login';

}
