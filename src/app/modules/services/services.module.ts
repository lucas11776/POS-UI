import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { NgxSpinnerModule } from 'ngx-spinner';

import { ServicesRoutingModule } from './services-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ServicesComponent } from './pages/services/services.component';
import { UploadComponent } from './pages/upload/upload.component';
import { CategoryComponent } from './pages/category/category.component';

@NgModule({
  declarations: [
    ServicesComponent,
    UploadComponent,
    CategoryComponent,
  ],
  imports: [
    CommonModule,
    ServicesRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    NgxSpinnerModule,
  ]
})
export class ServicesModule { }
