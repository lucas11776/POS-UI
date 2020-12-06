import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { HomeRoutingModule } from './home-routing.module';
import { ProductsModule } from '../products/products.module';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [

  HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HttpClientModule,
    RouterModule,
    ProductsModule,
  ]
})
export class HomeModule { }
