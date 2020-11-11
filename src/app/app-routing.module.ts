import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticationComponent } from './layouts/authentication/authentication.component';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
 
const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
    },
    {
        path: 'auth',
        component: AuthenticationComponent,
        loadChildren: () => import('./modules/authentication/authentication.module').then(m => m.AuthenticationModule) 
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