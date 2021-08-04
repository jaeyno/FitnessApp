import { AuthData } from './model/auth-data.model';
import { Injectable } from '@angular/core';
import { User } from './model/user.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authChange = new Subject<boolean>();

  private user: User;

  constructor(
    private router: Router,
    private authFire: AngularFireAuth
  ) { }

  registerUser(authData: AuthData) {
    this.authFire.auth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        console.log(result);
      }).catch(error => {
        console.log(error);
      })

    this.authSuccessfully();
  }

  login(authData: AuthData) {
    this.authFire.auth.signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        console.log(result);
      }).catch(error => {
        console.log(error);
      })

    this.authSuccessfully();
  }

  logout() {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/login'])
  }

  getUser() {
    return { ...this.user };
  }

  isAuth() {
    return this.user != null;
  }

  private authSuccessfully() {
    this.authChange.next(true);
    this.router.navigate(['/training'])
  }
}
