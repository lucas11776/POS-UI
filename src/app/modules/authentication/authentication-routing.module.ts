import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { GuestGuard } from '../../core/guards/guest.guard';

const routes: Routes = [
  {
    path: 'register', component: RegisterComponent, canActivate: [GuestGuard]
  },
  {
    path: 'login', component: LoginComponent, canActivate: [GuestGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
