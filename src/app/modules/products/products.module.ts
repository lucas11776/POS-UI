import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './pages/products/products.component';
import { ProductComponent } from './components/product/product.component';
import { SharedModule } from '../../shared/shared.module';
import { UploadComponent } from './pages/upload/upload.component';
import { CategoryComponent } from './pages/category/category.component';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductComponent,
    UploadComponent,
    CategoryComponent,
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
    NgxSpinnerModule,
    NgbModule,
  ],
  exports: [
    ProductsComponent,
  ]
})
export class ProductsModule { }
