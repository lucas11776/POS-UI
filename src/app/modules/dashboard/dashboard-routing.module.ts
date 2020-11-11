import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';

import { StatisticsComponent } from './pages/statistics/statistics.component';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';

const routes: Routes = [
  { path: '', component: SidebarComponent, outlet: 'sidebar' },
  { path: '', component: NavbarComponent, outlet: 'navbar' },
  { path: '', component: StatisticsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
