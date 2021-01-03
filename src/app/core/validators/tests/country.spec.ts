import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { country } from '../form-validators';
import { Countries as CountriesMock } from '../../mocks/address.mock';

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

    it('should check if validator returns invalid is country is invalid.', fakeAsync(() => {
        let countries = CountriesMock(10);
        formGroup = formBuilder.group({ country: [null, [], country(of(countries))]});
        formGroup.controls.country.setValue(20);
        tick();
        expect(formGroup.controls.country.errors).toEqual({ invalid: true });
    }));

    it('should check if validator returns null if country id does not exist.', fakeAsync(() => {
        let countries = CountriesMock(10);
        formGroup = formBuilder.group({ country: [null, [], country(of(countries))]});
        formGroup.controls.country.setValue(1);
        tick();
        expect(formGroup.controls.country.errors).toBeNull();
    }));
});