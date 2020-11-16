import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { FileDirective } from './directives/file.directive';
import { AlertComponent } from './components/alert/alert.component';
import { RouterBaseActiveDirective } from './directives/router-base-active.directive';


@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    HeaderComponent,
    FileDirective,
    AlertComponent,
    RouterBaseActiveDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    SidebarComponent,
    NavbarComponent,
    HeaderComponent,
    FileDirective,
    AlertComponent,
    RouterBaseActiveDirective
  ]
})
export class SharedModule { }
