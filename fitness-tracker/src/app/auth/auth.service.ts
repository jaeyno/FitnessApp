import { TrainingService } from './../training/training.service';
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

  private isAuthenticated: boolean = false;

  constructor(
    private router: Router,
    private authFire: AngularFireAuth,
    private trainingService: TrainingService
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
    this.trainingService.cancelSubscriptions();
    this.authFire.auth.signOut();
    this.isAuthenticated = false;
    this.authChange.next(false);
    this.router.navigate(['/login'])
  }

  isAuth() {
    return this.isAuthenticated;
  }

  private authSuccessfully() {
    this.isAuthenticated = true;
    this.authChange.next(true);
    this.router.navigate(['/training'])
  }
}
