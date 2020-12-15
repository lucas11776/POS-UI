import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from '../../../core/http/http.service';
import { Service, CreateService, ServicesPagination } from '../../../shared/models/service.model';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private _http: HttpService) { }

  all(): Observable<Service[]> {
    return this._http.get('services/all');
  }

  get(): Observable<ServicesPagination> {
    return this._http.get('services');
  }

  create(form: CreateService): Observable<Service> {
    return this._http.post('services', form);
  }
}
