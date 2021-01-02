import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { country } from '../form-validators';
import {
    Countries as CountriesMock,
    CountriesValidator as CountriesServiceMock
} from '../../mocks/address.mock';

describe('Country Validator', () => {
    let formGroup: FormGroup;
    let formBuilder: FormBuilder;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
            ]
        });
    });

    beforeEach(() => {
        formBuilder = TestBed.inject(FormBuilder);
    });

    xit('should check if validator returns invalid is country is invalid.', fakeAsync(() => {
        let countries = CountriesMock(10);
        formGroup = formBuilder.group({ country: [null, [country(of(countries))]] });
        formGroup.controls.country.setValue(20);
        expect(formGroup.controls.country.errors).toEqual({ invalid: true });
    }));
});