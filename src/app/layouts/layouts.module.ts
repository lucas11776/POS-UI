import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AuthenticationComponent } from './authentication/authentication.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AuthenticationComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class LayoutsModule { }
