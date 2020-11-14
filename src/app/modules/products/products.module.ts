import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { ngfModule } from 'angular-file';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './pages/products/products.component';
import { ProductComponent } from './components/product/product.component';
import { SharedModule } from '../../shared/shared.module';
import { UploadComponent } from './pages/upload/upload.component';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductComponent,
    UploadComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    ngfModule,
  ],
  exports: [
    ProductsComponent,
  ]
})
export class ProductsModule { }
