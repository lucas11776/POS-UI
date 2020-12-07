import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PosComponent } from './pos.component';
import { PosSidebarComponent } from '../../shared/components/pos-sidebar/pos-sidebar.component';

const routes: Routes = [
  { path: '', component: PosSidebarComponent, outlet: 'sidebar' },
  { path: '', component: PosComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PosRoutingModule { }
