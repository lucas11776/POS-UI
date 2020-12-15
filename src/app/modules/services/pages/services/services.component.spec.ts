import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { SharedModule } from '../../../../shared/shared.module';
import { of, throwError } from 'rxjs';

import { ServicesComponent } from './services.component';
// import { ProductComponent } from '../../components/product/product.component';
// import { ProductService } from '../../shared/product.service';
import { Pagination } from '../../../../core/mocks/pagination.mock';
import { Product } from '../../../../core/mocks/product.mock';
import { Paginator } from 'src/app/shared/models/pagination.model';

describe('ServicesComponent', () => {
  let component: ServicesComponent;
  let fixture: ComponentFixture<ServicesComponent>;
  let ngxSpinnerService: NgxSpinnerService;
  // let productService: ProductService;
  let products: Paginator;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        // ProductsComponent,
        // ProductComponent,
      ],
      imports: [
        SharedModule,
        RouterTestingModule,
        HttpClientTestingModule,
        NgxSpinnerModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesComponent);
    component = fixture.componentInstance;
    ngxSpinnerService = TestBed.inject(NgxSpinnerService);
    // productService = TestBed.inject(ProductService);
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
});
