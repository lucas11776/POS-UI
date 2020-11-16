import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from '../http/http.service';
import { CreateProduct, Product } from '../../shared/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _http: HttpService) { }

  create(form: CreateProduct): Observable<Product> {
    return this._http.post<Product>('products', form);
  } 
}
