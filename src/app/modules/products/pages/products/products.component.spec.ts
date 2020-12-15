import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { SharedModule } from '../../../../shared/shared.module';
import { of, throwError } from 'rxjs';

import { ProductsComponent } from './products.component';
import { ProductsModule } from '../../products.module';
import { ProductsService } from '../../shared/products.service';
import { Pagination } from '../../../../core/mocks/pagination.mock';
import { Product as ProductMock } from '../../../../core/mocks/product.mock';
import { Paginator } from 'src/app/shared/models/pagination.model';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let ngxSpinnerService: NgxSpinnerService;
  let productsService: ProductsService;
  let products: Paginator;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProductsComponent,
      ],
      imports: [
        SharedModule,
        RouterTestingModule,
        HttpClientTestingModule,
        NgxSpinnerModule,
        ProductsModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    ngxSpinnerService = TestBed.inject(NgxSpinnerService);
    productsService = TestBed.inject(ProductsService);
    products = Pagination([ProductMock()], 5);
    fixture.detectChanges();
  });

  beforeEach(() => {
    spyOn(ngxSpinnerService, 'show').and.returnValue();
    spyOn(ngxSpinnerService, 'hide').and.returnValue();
  });

  it('should check if Products component is created.', () => {
    expect(component).toBeTruthy();
  });

  it('should clear error when pagination is called.', () => {
    component.error = { message: 'Something went wrong' };
    component.pagination(2);
    expect(component.error).toBeNull();
  });

  it('should show spinner when pagination is called.', fakeAsync(() => {
    component.pagination(2);
    expect(ngxSpinnerService.show).toHaveBeenCalled();
  }));

  it('should assign products when pagination request has completed.', fakeAsync(() => {
    spyOn(productsService, 'get').and.returnValue(of(products));
    component.pagination(2);
    tick();
    expect(component.products).toEqual(products);
  }));

  it('should hide spinner when paginate request is complate.', fakeAsync(() => {
    spyOn(productsService, 'get').and.returnValue(of(products));
    component.pagination(2);
    tick();
    expect(ngxSpinnerService.hide).toHaveBeenCalled();
  }));

  it('should move window to at top when paginate request is completed.', fakeAsync(() => {
    spyOn(window, 'scroll').and.returnValue();
    spyOn(productsService, 'get').and.returnValue(of(products));
    component.pagination(2);
    tick();
    expect(window.scroll).toHaveBeenCalled();
  }));

  it('should assign error when pagination request failed.', fakeAsync(() => {
    const error = { message: 'Something went wrong.' };
    spyOn(productsService, 'get').and.returnValue(throwError(error));
    component.pagination(2);
    tick();
    expect(component.error).toEqual(error);
  }));

  it('should hide spinner when pagination request failed.', fakeAsync(() => {
    spyOn(productsService, 'get').and.returnValue(throwError({ }));
    component.pagination(2);
    tick();
    expect(ngxSpinnerService.hide).toHaveBeenCalled();
  }));
});
