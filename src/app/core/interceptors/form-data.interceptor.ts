import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { FormDataService } from '../services/form-data.service';

@Injectable()
export class FormDataInterceptor implements HttpInterceptor {

  constructor(private _formDateService: FormDataService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    /* istanbul ignore else */
    if(request.method == 'POST' && request.body instanceof Object)
      return next.handle(request.clone({ body: this._formDateService.convert(request.body) }));
    return next.handle(request);
  }
}
