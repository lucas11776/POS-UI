import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  
  constructor(
    private _authenticationService: AuthenticationService,
    private _router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let isLoggedin = this._authenticationService.loggedin();
    if(!isLoggedin) this._router.navigate(['/', 'auth', 'login']);
    return isLoggedin;
  }
}
