import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import faker from 'faker';

import { UploadComponent } from './upload.component';
import { SharedModule } from '../../../../shared/shared.module';
import { CreateProduct as ProductMock } from '../../../../core/mocks/product.mock';
import { CreateProduct } from 'src/app/shared/models/product.model';
import { Errors } from '../../../../shared/errors/form.error';

describe('UploadComponent', () => {
  let component: UploadComponent;
  let fixture: ComponentFixture<UploadComponent>;
  let productMock: CreateProduct;

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
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadComponent);
    component = fixture.componentInstance;
    productMock = ProductMock();
    fixture.detectChanges();
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
});
