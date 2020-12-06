import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

import { ProductService } from './product.service';
import { Product } from '../../../core/mocks/product.mock';
import { Pagination } from '../../../core/mocks/pagination.mock';

describe('ProductService', () => {
  let service: ProductService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ]
    });
  });

  beforeEach(() => {
    service = TestBed.inject(ProductService);
    httpClient = TestBed.inject(HttpClient);
  })

  it('should check if Product component is created.', () => {
    expect(service).toBeTruthy();
  });

  it('should get all products in database.', fakeAsync(() => {
    const products = [Product(), Product()];
    spyOn(httpClient, 'get').and.returnValue(of(products));
    service.all().subscribe(p => expect(p).toEqual(products));
    tick();
  }));

  it('should get products as pagination.', fakeAsync(() => {
    const products = Pagination([Product()], 10);
    spyOn(httpClient, 'get').and.returnValue(of(products));
    service.get().subscribe(p => expect(p).toEqual(products));
    tick();
  }));
});
