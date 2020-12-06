import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { ProductsModule } from '../products/products.module';

@NgModule({
  declarations: [StatisticsComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    ProductsModule,
  ]
})
export class DashboardModule { }
