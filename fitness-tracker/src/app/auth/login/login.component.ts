import { Subscription } from 'rxjs';
import { UiService } from './../../shared/ui.service';
import { AuthService } from './../auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  isLoading: boolean = false;
  subscription: Subscription[] = [];

  constructor(
    private authService: AuthService,
    private uiService: UiService
  ) { }

  ngOnInit(): void {
    this.subscription.push(this.uiService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    }))

    this.loginForm = new FormGroup({ 
      email: new FormControl('', { validators: [Validators.required, Validators.email] }),
      password: new FormControl('', { validators: [Validators.required] })
    })
  }

  ngOnDestroy(): void {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

  onSubmit() {
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
  }

}
