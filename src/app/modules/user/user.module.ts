import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { UserRoutingModule } from './user-routing.module';
import { EditComponent } from './pages/edit/edit.component';
import { SharedModule } from '../../shared/shared.module';
import { ProfileComponent } from './pages/profile/profile.component';
import { EditPersonalDetailsComponent } from './components/edit-personal-details/edit-personal-details.component';
import { EditAddressComponent } from './components/edit-address/edit-address.component';
import { EditDescriptionComponent } from './components/edit-description/edit-description.component';
import { UploadProfilePictureComponent } from './components/upload-profile-picture/upload-profile-picture.component';

@NgModule({
  declarations: [
    EditComponent,
    ProfileComponent,
    EditPersonalDetailsComponent,
    EditAddressComponent,
    EditDescriptionComponent,
    UploadProfilePictureComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
  ]
})
export class UserModule { }
