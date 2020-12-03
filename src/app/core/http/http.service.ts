import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { Options } from '../../shared/models/http.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  // static readonly HOST = 'http://192.168.0.147:81/api';
  static readonly HOST = 'http://localhost:81/api';

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
    let error = httpError.error;
    /* istanbul ignore else */
    if(!error || error instanceof ProgressEvent)
      error = { message: httpError.message };
    return throwError(error);
  }
}
