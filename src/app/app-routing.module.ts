import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticationComponent } from './layouts/authentication/authentication.component';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { GuestGuard } from './core/guards/guest.guard';
import { UserGuard } from './core/guards/user.guard';
 
const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [UserGuard]
    },
    {
        path: 'auth',
        component: AuthenticationComponent,
        loadChildren: () => import('./modules/authentication/authentication.module').then(m => m.AuthenticationModule),
        canActivate: [GuestGuard]
    },
    {
        path: 'products',
        component: DashboardComponent,
        loadChildren: () => import('./modules/products/products.module').then(m => m.ProductsModule),
        canActivate: [UserGuard]
    },
    {
        path: '**',
        redirectTo: ''
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
    exports: [RouterModule],
})
export class AppRoutingModule { }