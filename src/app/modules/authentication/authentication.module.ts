import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    AuthenticationRoutingModule,
    NgxSpinnerModule,
    SharedModule,
    HttpClientModule,
  ]
})
export class AuthenticationModule { }
