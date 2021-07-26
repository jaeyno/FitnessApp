import { AuthData } from './model/auth-data.model';
import { Injectable } from '@angular/core';
import { User } from './model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: User;

  constructor() { }

  registerUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };
  }

  login(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };
  }

  logout() {
    this.user = null;
  }

  getUser() {
    return { ...this.user };
  }

  isAuth() {
    return this.user == null;
  }
}
