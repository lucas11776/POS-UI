import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { of, throwError } from 'rxjs';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import faker from 'faker';

import { UploadComponent } from './upload.component';
import { SharedModule } from '../../../../shared/shared.module';
import { CreateProduct as ProductMock, Product } from '../../../../core/mocks/product.mock';
import { CreateProduct } from '../../../../shared/models/product.model';
import { Errors } from '../../../../shared/errors/form.error';
import { ProductsService } from '../../../../core/services/products.service';

describe('UploadComponent', () => {
  let component: UploadComponent;
  let fixture: ComponentFixture<UploadComponent>;
  let productMock: CreateProduct;
  let productService: ProductsService;
  let ngxSpinnerService: NgxSpinnerService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UploadComponent
      ],
      imports: [
        SharedModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        RxReactiveFormsModule,
        HttpClientTestingModule,
        NgxSpinnerModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadComponent);
    component = fixture.componentInstance;
    productMock = ProductMock();
    productService = TestBed.inject(ProductsService);
    ngxSpinnerService = TestBed.inject(NgxSpinnerService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  beforeEach(() => {
    spyOn(router, 'navigate').and.returnValue(new Promise((rs,rj) => rs.call(true)));
    spyOn(ngxSpinnerService, 'show').and.returnValue(null);
    spyOn(ngxSpinnerService, 'hide').and.returnValue(null);
  });

  it('should create Upload component.', () => {
    expect(component).toBeTruthy();
  });

  it('should check if image is required field.', () => {
    productMock.image = null;
    component.form.setValue(productMock);
    component.form.controls.image.markAsDirty();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain(Errors.image.required);
  });

  it('should check if name is required field.', () => {
    productMock.name = null;
    component.form.setValue(productMock);
    component.form.controls.name.markAsDirty();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain(Errors.name.required);
  });

  it('should check if name contains minimum of 5 charactors.', () => {
    productMock.name = 'Tele';
    component.form.setValue(productMock);
    component.form.controls.name.markAsDirty();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain(Errors.name.min);
  });

  it('should check if name contains minimum of 5 charactors.', () => {
    productMock.name = faker.lorem.words(51);
    component.form.setValue(productMock);
    component.form.controls.name.markAsDirty();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain(Errors.name.max);
  });

  it('should check if price is required field.', () => {
    productMock.price = null;
    component.form.setValue(productMock);
    component.form.controls.price.markAsDirty();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain(Errors.price.required);
  });

  it('should check if price is numeric.', () => {
    component.form.setValue(productMock);
    component.form.controls.price.setValue('R100');
    component.form.controls.price.markAsDirty();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain(Errors.price.invalid);
  });

  it('should check if discount is numeric.', () => {
    component.form.setValue(productMock);
    component.form.controls.discount.setValue('R50');
    component.form.controls.discount.markAsDirty();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain(Errors.discount.invalid);
  });

  it('should check if instock is required field.', () => {
    productMock.in_stock = null;
    component.form.setValue(productMock);
    component.form.controls.in_stock.markAsDirty();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain(Errors.in_stock.required);
  });

  it('should check if instock is numeric.', () => {
    component.form.setValue(productMock);
    component.form.controls.in_stock.setValue('100 items');
    component.form.controls.in_stock.markAsDirty();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain(Errors.in_stock.invalid);
  });

  it('should check if barcode is numeric.', () => {
    component.form.setValue(productMock);
    component.form.controls.barcode.setValue('100 items');
    component.form.controls.barcode.markAsDirty();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain(Errors.barcode.invalid);
  });

  it('should check if description is required field.', () => {
    productMock.description = null;
    component.form.setValue(productMock);
    component.form.controls.description.markAsDirty();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain(Errors.description.required);
  });

  it('should check if description contain words that are less then 1500.', () => {
    productMock.description = faker.lorem.words(2000);
    component.form.setValue(productMock);
    component.form.controls.description.markAsDirty();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain(Errors.description.max);
  });

  it('should clear errors when upload is called', () => {
    component.error = { message: 'Something went wrong.' };
    component.upload();
    expect(component.error).toBeNull();
  });

  it('should display spinner when making create product request.', () => {
    component.upload();
    expect(ngxSpinnerService.show).toHaveBeenCalled();
  });

  it('should hide spinner after product is created.', fakeAsync(() => {
    spyOn(productService, 'create').and.returnValue(of(Product()));
    component.upload();
    tick();
    expect(ngxSpinnerService.hide).toHaveBeenCalled();
  }));

  it('should navigate to uploaded product route when product is stored in database.', fakeAsync(() => {
    spyOn(productService, 'create').and.returnValue(of(Product()));
    component.upload();
    tick();
    expect(router.navigate).toHaveBeenCalled();
  }));

  it('should assign upload product error to errors is upload product fails.', fakeAsync(() => {
    let error = { message: 'Something when wrong please try again' };
    spyOn(productService, 'create').and.returnValue(throwError(error));
    component.upload();
    expect(component.error).toEqual(error);
  }));

  it('should hide spinner when upload product fails.', fakeAsync(() => {
    spyOn(productService, 'create').and.returnValue(throwError({}));
    component.upload();
    tick();
    expect(ngxSpinnerService.hide).toHaveBeenCalled();
  }));
});
