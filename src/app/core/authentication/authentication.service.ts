import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

import { HttpService } from '../http/http.service';
import { Register, Login } from '../../shared/models/authentication.model';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private _http: HttpService,
    private _tokenService: TokenService,
    private _jwtHelperService: JwtHelperService) { }

  loggedin(): boolean {
    return !this._jwtHelperService.isTokenExpired(this._tokenService.token());
  }

  register<Token>(form: Register): Observable<Token> {
    return this._http.post<Token>('auth/register', form);
  }

  login<Token>(crediatials: Login): Observable<Token> {
    return this._http.post<Token>('auth/login', crediatials);
  }
}
