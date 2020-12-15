import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatisticsComponent } from './pages/statistics/statistics.component';
import { DashboardSidebarComponent } from '../../shared/components/dashboard-sidebar/dashboard-sidebar.component';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';

const routes: Routes = [
  { path: '', component: DashboardSidebarComponent, outlet: 'sidebar' },
  { path: '', component: NavbarComponent, outlet: 'navbar' },
  { path: '', component: StatisticsComponent },
  { path: 'products', loadChildren: () => import('../products/products.module').then(m => m.ProductsModule) },
  { path: 'services', loadChildren: () => import('../services/services.module').then(m => m.ServicesModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
