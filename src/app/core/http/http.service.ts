import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Options } from '../../shared/models/http.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  static readonly HOST = 'http://localhost';

  constructor(private _http: HttpClient) { }

  get<T>(uri: string, options?: Options): Observable<T> {
    return this._http.get<T>(`${HttpService.HOST}/${uri}`, options);
  }

  post<T>(uri: string, data: any, options?: Options): Observable<T> {
    return this._http.post<T>(`${HttpService.HOST}/${uri}`, data, options);
  }

  patch<T>(uri: string, data: any, options?: Options): Observable<T> {
    return this._http.patch<T>(`${HttpService.HOST}/${uri}`, data, options);
  }

  put<T>(uri: string, data: any, options?: Options): Observable<T> {
    return this._http.put<T>(`${HttpService.HOST}/${uri}`, data, options);
  }

  delete<T>(uri: string, options?: Options): Observable<T> {
    return this._http.delete<T>(`${HttpService.HOST}/${uri}`);
  }
}
