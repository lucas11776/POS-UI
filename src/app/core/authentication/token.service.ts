import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

import { Token } from '../../shared/models/authentication.model';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private token_name = 'token';
  private type_name = 'token_type';

  constructor(private _cookieService: CookieService) { }

  get(): string {
    if(this._cookieService.get(this.type_name) && this.token())
      return `${this._cookieService.get(this.type_name)} ${this.token()}`;
    return ``;
  }

  token(): string {
    return this._cookieService.get(this.token_name);
  }

  store(token: Token): void {
    let access_token = token.token;
    let token_type = token.type;
    let token_expires = this.date(token.expires);
    this._cookieService.set(this.token_name, access_token, token_expires, '/');
    this._cookieService.set(this.type_name, token_type, token_expires, '/');
  }

  delete(): void {
    this._cookieService.delete(this.token_name);
    this._cookieService.delete(this.type_name);
  }

  private date(seconds: number): Date {
    const expire = new Date();
    expire.setTime(expire.getTime() + (seconds * 1000));
    return expire;
  }
}
