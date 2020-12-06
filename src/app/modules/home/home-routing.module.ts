import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeSidebarComponent } from '../../shared/components/home-sidebar/home-sidebar.component';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: '', component: HomeSidebarComponent, outlet: 'sidebar' },
  { path: '', component: NavbarComponent, outlet: 'navbar'},
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
