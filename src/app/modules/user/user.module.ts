import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { EditComponent } from './pages/edit/edit.component';
import { SharedModule } from '../../shared/shared.module';
import { ProfileComponent } from './pages/profile/profile.component';

@NgModule({
  declarations: [
    
  EditComponent,
    
  ProfileComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
  ]
})
export class UserModule { }
