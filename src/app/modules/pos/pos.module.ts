import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PosRoutingModule } from './pos-routing.module';
import { SharedModule  } from '../../shared/shared.module';
import { ProductsComponent } from './pages/products/products.component';
import { LayoutsModule } from '../../layouts/layouts.module';
import { CheckoutComponent } from './component/checkout/checkout.component';
import { PosNavbarComponent } from './component/pos-navbar/pos-navbar.component';
import { CheckoutNavbarComponent } from './component/checkout-navbar/checkout-navbar.component';
import { ServicesComponent } from './pages/services/services.component';
import { CheckoutListComponent } from './component/checkout-list/checkout-list.component';
import { ItemComponent } from './component/item/item.component';
import { CheckoutSummaryComponent } from './component/checkout-summary/checkout-summary.component';
import { CheckoutButtonsComponent } from './component/checkout-buttons/checkout-buttons.component';
import { CheckoutListElementComponent } from './component/checkout-list-element/checkout-list-element.component';

@NgModule({
  declarations: [
    PosNavbarComponent,
    CheckoutNavbarComponent,
    ProductsComponent,
    ServicesComponent,
    CheckoutComponent,
    CheckoutListComponent,
    ItemComponent,
    CheckoutSummaryComponent,
    CheckoutButtonsComponent,
    CheckoutListElementComponent,
  ],
  imports: [
    CommonModule,
    PosRoutingModule,
    SharedModule,
    LayoutsModule,
  ],
  exports: [
    CheckoutComponent,
    CheckoutListComponent,
    ItemComponent,
    CheckoutSummaryComponent,
    CheckoutSummaryComponent,
    CheckoutButtonsComponent,
  ]
})
export class PosModule { }
