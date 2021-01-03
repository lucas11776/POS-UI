import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import faker from 'faker';

import { EditAddressComponent } from './edit-address.component';
import { CountriesService } from '../../../../core/services/countries.service';
import {
  Address as AddressMock,
  Countries as CountriesMock,
  UpdateAddress as UpdateAddressMock,
  CountriesValidator as CountriesValidatorMock,
} from '../../../../core/mocks/address.mock';
import { UpdateAddress } from '../../../../shared/models/address.model';
import { Errors } from '../../../../shared/errors/form.error';
import { HttpClient } from '@angular/common/http';

describe('EditAddressComponent', () => {
  let component: EditAddressComponent;
  let fixture: ComponentFixture<EditAddressComponent>;
  let countriesServices: CountriesService;
  let updateAddress: UpdateAddress;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EditAddressComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RxReactiveFormsModule,
        HttpClientTestingModule,
      ],
      providers: [
        HttpClient
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAddressComponent);
    component = fixture.componentInstance;
    countriesServices = TestBed.inject(CountriesService);
    updateAddress = UpdateAddressMock();
    fixture.detectChanges();
  });

  it('should check if EditAddress component is created.', () => {
    expect(component).toBeTruthy();
  });

  it('should get default form values.', () => {
    const address = AddressMock();
    component.address = address;
    component.ngOnInit();
    expect(component.form.value).toEqual(<UpdateAddress>{
      address: address.address,
      country_id: address.country.id,
      city: address.city,
      postal_code: address.postal_code
    })
  });

  it('should check if address is valid address pattern.', () => {
    updateAddress.address = 'Main Road 23';
    component.form.setValue(updateAddress);
    component.form.controls.address.markAsDirty();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain(Errors.address.invalid);
  });

  it('should check if city has minimum of 3 charactors.', () => {
    updateAddress.city = 'Jo';
    component.form.setValue(updateAddress);
    component.form.controls.city.markAsDirty();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain(Errors.city.min);
  });

  it('should check if city has maximum of 50 charactors.', () => {
    updateAddress.city = faker.random.words(51);
    component.form.setValue(updateAddress);
    component.form.controls.city.markAsDirty();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain(Errors.city.max);
  });

  it('should check if country_id is a valid country id.', fakeAsync(() => {
    const countries = CountriesMock(10);
    component.form.controls.country_id.clearAsyncValidators();
    component.form.controls.country_id.setAsyncValidators(CountriesValidatorMock(countries));
    component.form.controls.country_id.setValue(20);
    component.form.controls.country_id.markAsDirty();
    tick();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain(Errors.country.invalid);
  }));

  it('should check if postal code is a valid postal', () => {
    updateAddress.postal_code = '293d';
    component.form.setValue(updateAddress);
    component.form.controls.postal_code.markAsDirty();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain(Errors.postal_code.invalid);
  });
});
