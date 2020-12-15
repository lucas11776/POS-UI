import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

import { ProductsService } from './products.service';
import { Product as ProductMock, CreateProduct as CreateProductMock } from '../../../core/mocks/product.mock';
import { Pagination } from '../../../core/mocks/pagination.mock';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ]
    });
  });

  beforeEach(() => {
    service = TestBed.inject(ProductsService);
    httpClient = TestBed.inject(HttpClient);
  })

  it('should check if Product component is created.', () => {
    expect(service).toBeTruthy();
  });

  it('should make request to create new product.', fakeAsync(() => {
    const product = ProductMock()
    spyOn(httpClient, 'post').and.returnValue(of(product));
    service.create(CreateProductMock()).subscribe(p => expect(p).toBe(product));
    tick();
  }));

  it('should get all products from shareReplay products$ observable.', fakeAsync(() => {
    const products = [ProductMock(), ProductMock()];
    spyOn(service, 'all').and.returnValue(of(products));
    service.products$.subscribe(ps => expect(ps).toEqual(products));
    tick();
  }));


  it('should get all products in database.', fakeAsync(() => {
    const products = [ProductMock(), ProductMock()];
    spyOn(httpClient, 'get').and.returnValue(of(products));
    service.all().subscribe(ps => expect(ps).toEqual(products));
    tick();
  }));

  it('should get products as pagination.', fakeAsync(() => {
    const products = Pagination([ProductMock()], 10);
    spyOn(httpClient, 'get').and.returnValue(of(products));
    service.get().subscribe(ps => expect(ps).toEqual(products));
    tick();
  }));
});
