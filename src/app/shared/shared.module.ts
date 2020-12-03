import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { FileDirective } from './directives/file.directive';
import { AlertComponent } from './components/alert/alert.component';
import { RouterBaseActiveDirective } from './directives/router-base-active.directive';
import { CategoriesComponent } from './components/categories/categories.component';
import { CreateCategoryComponent } from './components/create-category/create-category.component';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';
import { CategoriesListElementComponent } from './components/categories-list-element/categories-list-element.component';
import { UpdateCategoryComponent } from './components/update-category/update-category.component';

@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    HeaderComponent,
    FileDirective,
    AlertComponent,
    RouterBaseActiveDirective,
    CategoriesComponent,
    CreateCategoryComponent,
    CategoriesListComponent,
    CategoriesListElementComponent,
    UpdateCategoryComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
  ],
  exports: [
    SidebarComponent,
    NavbarComponent,
    HeaderComponent,
    FileDirective,
    AlertComponent,
    RouterBaseActiveDirective,
    CategoriesComponent,
    CreateCategoryComponent,
  ]
})
export class SharedModule { }
