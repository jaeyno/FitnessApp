import { TrainingService } from './../training/training.service';
import { AuthData } from './model/auth-data.model';
import { Injectable } from '@angular/core';
import { User } from './model/user.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authChange = new Subject<boolean>();

  private isAuthenticated: boolean = false;

  constructor(
    private router: Router,
    private authFire: AngularFireAuth,
    private trainingService: TrainingService,
    private snackBar: MatSnackBar
  ) { }

  initAuthListener() {
    this.authFire.authState.subscribe(user => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training'])
      } else {
        this.trainingService.cancelSubscriptions();
        this.isAuthenticated = false;
        this.authChange.next(false);
        this.router.navigate(['/login'])
      }
    })
  }

  registerUser(authData: AuthData) {
    this.authFire.auth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        console.log(result);
      }).catch(error => {
        this.snackBar.open(error.message, null, {
          duration: 3000
        });
      })
  }

  login(authData: AuthData) {
    this.authFire.auth.signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        console.log(result);
      }).catch(error => {
        this.snackBar.open(error.message, null, {
          duration: 3000
        });
      })
  }

  logout() {
    this.authFire.auth.signOut();
  }

  isAuth() {
    return this.isAuthenticated;
  }
}
