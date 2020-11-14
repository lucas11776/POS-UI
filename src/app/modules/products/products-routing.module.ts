import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component'
import { ProductsComponent } from './pages/products/products.component';
import { UploadComponent } from './pages/upload/upload.component';

const routes: Routes = [
  { path: '', component: SidebarComponent, outlet: 'sidebar' },
  { path: '', component: NavbarComponent, outlet: 'navbar' },
  { path: '', component: ProductsComponent },
  { path: 'upload', component: UploadComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
