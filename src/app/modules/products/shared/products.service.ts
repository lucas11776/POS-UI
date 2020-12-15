import { Injectable } from '@angular/core';
import { switchMap, shareReplay } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

import { HttpService } from '../../../core/http/http.service';
import { Product, ProductsPagination, CreateProduct } from '../../../shared/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private productsSubject = new BehaviorSubject<void>(null);
  products$: Observable<Product[]> = this.productsSubject.asObservable().pipe(
    switchMap(_ => this.all()),
    shareReplay(1)
  );

  constructor(private _http: HttpService) { }

  all(): Observable<Product[]> {
    return this._http.get<Product[]>('products/all');
  }
  
  get(): Observable<ProductsPagination> {
    return this._http.get<ProductsPagination>('products');
  }
  
  create(form: CreateProduct): Observable<Product> {
    return this._http.post<Product>('products', form);
  }
}
