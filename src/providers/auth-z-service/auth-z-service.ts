import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../auth-service/auth-service';

@Injectable()
export class AuthZServiceProvider {
  currentUser: User;

  constructor(public http: HttpClient) {
    console.log('Hello AuthZServiceProvider Provider');
  }

}
