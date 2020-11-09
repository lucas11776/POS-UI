import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticationComponent } from './layouts/layouts/authentication/authentication.component'; 
 
const routes: Routes = [
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