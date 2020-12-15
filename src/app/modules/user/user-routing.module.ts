import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { HomeSidebarComponent } from '../../shared/components/home-sidebar/home-sidebar.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { EditComponent } from './pages/edit/edit.component';

const routes: Routes = [
  { path: '', component: HomeSidebarComponent, outlet: 'sidebar' },
  { path: '', component: NavbarComponent, outlet: 'navbar' },
  { path: '', component: ProfileComponent },
  { path: 'edit', component: EditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
