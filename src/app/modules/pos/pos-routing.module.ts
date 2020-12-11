import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PosSidebarComponent } from '../../shared/components/pos-sidebar/pos-sidebar.component';
import { PosComponent } from '../../layouts/pos/pos.component';
import { CheckoutComponent } from './component/checkout/checkout.component';
import { PosNavbarComponent } from './component/pos-navbar/pos-navbar.component';
import { CheckoutNavbarComponent } from './component/checkout-navbar/checkout-navbar.component';
import { ProductsComponent } from './pages/products/products.component';
import { ServicesComponent } from './pages/services/services.component';

const routes: Routes = [
  { path: '', component: PosSidebarComponent, outlet: 'sidebar' },
    { path: '', component: PosComponent, children: [
      { path: '',  component: PosNavbarComponent, outlet: 'first_window_navbar' },
      { path: '',  component: CheckoutNavbarComponent, outlet: 'second_window_navbar' },
      { path: '',  component: CheckoutComponent, outlet: 'second_window_content' },
      { path: 'products',  component: ProductsComponent },
      { path: 'services', component: ServicesComponent },
      { path: '', redirectTo: 'products' },
  ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PosRoutingModule { }
