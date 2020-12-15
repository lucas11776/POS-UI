import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
import { LogoutModalComponent } from './components/logout-modal/logout-modal.component';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { DashboardSidebarComponent } from './components/dashboard-sidebar/dashboard-sidebar.component';
import { HomeSidebarComponent } from './components/home-sidebar/home-sidebar.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ArrayPipe } from './pipes/array.pipe';
import { PosSidebarComponent } from './components/pos-sidebar/pos-sidebar.component';
import { CounterComponent } from './components/counter/counter.component';
import { ScrollbarDirective } from './directives/scrollbar.directive';
import { CategoryBadgeGroupComponent } from './components/category-badge-group/category-badge-group.component';
import { ImagesFormControlComponent } from './components/images-form-control/images-form-control.component';
import { FileFormControlComponent } from './components/file-form-control/file-form-control.component';
import { UploadedFileComponent } from './components/uploaded-file/uploaded-file.component';
import { ToFixedPipe } from './pipes/to-fixed.pipe';
import { MiddleTruncatePipe } from './pipes/middle-truncate.pipe';

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
    LogoutModalComponent,
    ConfirmationModalComponent,
    DashboardSidebarComponent,
    HomeSidebarComponent,
    PaginationComponent,
    ArrayPipe,
    PosSidebarComponent,
    CounterComponent,
    ScrollbarDirective,
    CategoryBadgeGroupComponent,
    ImagesFormControlComponent,
    FileFormControlComponent,
    UploadedFileComponent,
    ToFixedPipe,
    MiddleTruncatePipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    NgbModule,
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
    LogoutModalComponent,
    ConfirmationModalComponent,
    DashboardSidebarComponent,
    PaginationComponent,
    PosSidebarComponent,
    ArrayPipe,
    CounterComponent,
    ScrollbarDirective,
    ImagesFormControlComponent,
    FileFormControlComponent,
    ToFixedPipe,
    MiddleTruncatePipe,
  ]
})
export class SharedModule { }
