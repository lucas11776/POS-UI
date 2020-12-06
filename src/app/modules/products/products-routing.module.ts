import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsComponent } from './pages/products/products.component';
import { UploadComponent } from './pages/upload/upload.component';
import { CategoryComponent } from './pages/category/category.component';

const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'categories', component: CategoryComponent },
  { path: 'upload', component: UploadComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
