import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ProductsService } from './products.service';
import { HttpService } from '../http/http.service';
import { CreateProduct, Product } from '../mocks/product.mock';
import { of } from 'rxjs';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpService: HttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
  });

  beforeEach(() => {
    service = TestBed.inject(ProductsService);
    httpService = TestBed.inject(HttpService);
  });
  it('should create Products services.', () => {
    expect(service).toBeTruthy();
  });

  it('should create product.', fakeAsync(() => {
    let product = Product();
    spyOn(service, 'create').and.returnValue(of(product));
    let storedProduct = null;
    service.create(CreateProduct()).subscribe(p => storedProduct = p);
    tick();
    expect(product).toEqual(storedProduct);
  }));
});
