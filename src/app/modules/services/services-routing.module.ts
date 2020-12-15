import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServicesComponent } from './pages/services/services.component';
import { CategoryComponent } from './pages/category/category.component';
import { UploadComponent } from './pages/upload/upload.component';

const routes: Routes = [
  { path: '', component: ServicesComponent },
  { path: 'categories', component: CategoryComponent },
  { path: 'upload', component: UploadComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesRoutingModule { }
