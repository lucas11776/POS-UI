import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import faker from 'faker';
import { Observable } from 'rxjs';

import {
    Address as AddressInterface,
    UpdateAddress as UpdateAddressInterface,
    Country as CountryInterface
} from '../../shared/models/address.model';


export const Country = (id: number = null): CountryInterface => {
    return {
        id: id == null ? Math.floor(Math.random() * 100) : id,
        name: faker.address.country(),
    }
}

export const Countries = (numberCountries: number = 195): CountryInterface[] => {
    let countries = [];
    for(let i = 0; i < numberCountries; i++) countries[i] = Country(i);
    return countries;
}

export const Address = (): AddressInterface => {
    return {
        id: Math.floor(Math.random() * 100),
        created_at: faker.date.recent(),
        updated_at: faker.date.recent(),
        address: faker.address.streetAddress(),
        country: Country(),
        city: faker.address.city(),
        postal_code: Math.floor(Math.random() * 100000).toString(),
    }
}
export const UpdateAddress = (): UpdateAddressInterface => {
    return {
        address: faker.address.streetAddress(),
        country_id: Math.floor(Math.random() * 100),
        city: faker.address.city(),
        postal_code: Math.floor(Math.random() * 100000).toString(),
    }
}

export const CountriesValidator = (countries: CountryInterface[]): AsyncValidatorFn => {
    return (control: AbstractControl): Promise<ValidationErrors|null> => {
        return new Promise(resolve => {
            let country = countries.filter(country => control.value == country.id);
            /* istanbul ignore else */
            if(country.length == 0) resolve({ invalid: true });
            else resolve(null);
        });
    }
}