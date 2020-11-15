import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from '../http/http.service';
import { CreateProduct, Product } from '../../shared/models/product.model';
import { FormDataService } from './form-data.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private _http: HttpService,
    private _formDateService: FormDataService) { }

  create(form: CreateProduct): Observable<Product> {
    const formData = this._formDateService.convert(form);
    return this._http.post<Product>('products', formData);
  } 
}
