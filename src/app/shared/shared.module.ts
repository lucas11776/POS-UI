import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';


@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    SidebarComponent,
    NavbarComponent,
    HeaderComponent,
  ]
})
export class SharedModule { }
