import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from '@angular/forms';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';


import { WordsConfig } from './extension/words.config';
import { Country } from '../../shared/models/address.model';

export const words = (config: WordsConfig): ValidatorFn => {
    return (control: AbstractControl) => {
        const value = control.value;
        if(typeof value == 'string') {
            const numberOfWords = value.split(' ').length;
            /* istanbul ignore else */
            if(config.minWords && numberOfWords < config.minWords)
                return { minWords: true };
            /* istanbul ignore else */
            if(config.maxWords && numberOfWords > config.maxWords)
                return { maxWords: true };
        }
        return null;
    }
}

export const country = (countries: Observable<Country[]>): AsyncValidatorFn => {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        return countries.pipe(
            map(countries => {
                let country = countries.filter(country => country.id == control.value);
                return country.length == 0 ? null : { invalid: true };
            })
        )
    }
} 