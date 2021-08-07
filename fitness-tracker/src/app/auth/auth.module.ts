import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent,
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
  ]
})
export class AuthModule { }
