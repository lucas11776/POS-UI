import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { SharedModule } from '../../../../shared/shared.module';
import { of, throwError } from 'rxjs';

import { ServicesComponent } from './services.component';
import { ServicesModule } from '../../services.module';
import { ServicesService } from '../../shared/services.service';
import { Pagination } from '../../../../core/mocks/pagination.mock';
import { Product } from '../../../../core/mocks/product.mock';
import { Paginator } from 'src/app/shared/models/pagination.model';

describe('ServicesComponent', () => {
  let component: ServicesComponent;
  let fixture: ComponentFixture<ServicesComponent>;
  let ngxSpinnerService: NgxSpinnerService;
  let servicesService: ServicesService;
  let products: Paginator;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ServicesComponent
      ],
      imports: [
        SharedModule,
        RouterTestingModule,
        HttpClientTestingModule,
        NgxSpinnerModule,
        ServicesModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesComponent);
    component = fixture.componentInstance;
    ngxSpinnerService = TestBed.inject(NgxSpinnerService);
    servicesService = TestBed.inject(ServicesService);
    products = Pagination([Product()], 5);
    fixture.detectChanges();
  });

  beforeEach(() => {
    spyOn(ngxSpinnerService, 'show').and.returnValue();
    spyOn(ngxSpinnerService, 'hide').and.returnValue();
  });

  it('should check if Services compoment is created.', () => {
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
    spyOn(servicesService, 'get').and.returnValue(of(products));
    component.pagination(2);
    tick();
    expect(component.services).toEqual(products);
  }));

  it('should hide spinner when paginate request is complate.', fakeAsync(() => {
    spyOn(servicesService, 'get').and.returnValue(of(products));
    component.pagination(2);
    tick();
    expect(ngxSpinnerService.hide).toHaveBeenCalled();
  }));

  it('should move window to at top when paginate request is completed.', fakeAsync(() => {
    spyOn(window, 'scroll').and.returnValue();
    spyOn(servicesService, 'get').and.returnValue(of(products));
    component.pagination(2);
    tick();
    expect(window.scroll).toHaveBeenCalled();
  }));

  it('should assign error when pagination request failed.', fakeAsync(() => {
    const error = { message: 'Something went wrong.' };
    spyOn(servicesService, 'get').and.returnValue(throwError(error));
    component.pagination(2);
    tick();
    expect(component.error).toEqual(error);
  }));

  it('should hide spinner when pagination request failed.', fakeAsync(() => {
    spyOn(servicesService, 'get').and.returnValue(throwError({ }));
    component.pagination(2);
    tick();
    expect(ngxSpinnerService.hide).toHaveBeenCalled();
  }));
});
