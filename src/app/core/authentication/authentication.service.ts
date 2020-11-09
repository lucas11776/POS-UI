import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from '../http/http.service';
import { Register, Login, Token } from '../../shared/models/authentication.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private _http: HttpService) { }

  register<Token>(form: Register): Observable<Token> {
    return this._http.post<Token>('auth/register', form);
  }

  login<Token>(crediatials: Login): Observable<Token> {
    return this._http.post<Token>('auth/login', crediatials);
  }
}
