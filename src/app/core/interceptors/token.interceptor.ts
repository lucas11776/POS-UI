import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { TokenService } from '../authentication/token.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private _tokenService: TokenService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(
      request.clone({ setHeaders: { Authorization: this._tokenService.get() } })
    );
  }
}
