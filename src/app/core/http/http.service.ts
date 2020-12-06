import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { Options } from '../../shared/models/http.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  static readonly HOST = 'http://localhost:81/api';
  static readonly NETWORK_ERROR_MESSAGE = 'No internet connection';
  static readonly SERVER_ERROR_MESSAGE = 'Server is currently down';

  constructor(private _http: HttpClient) { }

  get<T>(uri: string, options?: Options): Observable<T> {
    return this._http.get<T>(`${HttpService.HOST}/${uri}`, options).pipe(
      catchError(this.error)
    );
  }

  post<T>(uri: string, data: any, options?: Options): Observable<T> {
    return this._http.post<T>(`${HttpService.HOST}/${uri}`, data, options).pipe(
      catchError(this.error)
    );
  }

  patch<T>(uri: string, data: any, options?: Options): Observable<T> {
    return this._http.patch<T>(`${HttpService.HOST}/${uri}`, data, options).pipe(
      catchError(this.error)
    );
  }

  put<T>(uri: string, data: any, options?: Options): Observable<T> {
    return this._http.put<T>(`${HttpService.HOST}/${uri}`, data, options).pipe(
      catchError(this.error)
    );
  }

  delete<T>(uri: string, options?: Options): Observable<T> {
    return this._http.delete<T>(`${HttpService.HOST}/${uri}`).pipe(
      catchError(this.error)
    );
  }

  error(httpError: HttpErrorResponse): Observable<never> {
    let err = httpError.error;
    if(err instanceof ProgressEvent || !err)
      if(!navigator.onLine) err = { message: HttpService.NETWORK_ERROR_MESSAGE, code: 'NETWORK' };
      else err = { message: HttpService.SERVER_ERROR_MESSAGE, code: 'SERVER' };
    else
      err = {...err, ...{ code: httpError.status == 401 ? 'UNAUTHORIZED' : 'SERVER' }};
    return throwError(err);
  }

}
