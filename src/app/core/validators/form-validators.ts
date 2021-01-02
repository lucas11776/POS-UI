import { AbstractControl, AsyncValidator, AsyncValidatorFn, ValidationErrors, ValidatorFn } from '@angular/forms';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';


import { WordsConfig } from './extension/words.config';
import { FileConfig } from './extension/file.config';
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

export const file = (config: FileConfig): ValidationErrors => {
    return (control: AbstractControl) => {
        const file = control.value;
        /* istanbul ignore else */
        if(file instanceof File) {
            /* istanbul ignore else */
            if(config.minSize && config.minSize > file.size)
                return { minSize: true };
            /* istanbul ignore else */
            if(config.maxSize && file.size > config.maxSize)
                return { maxSize: true };
            /* istanbul ignore else */
            if(config.extension) {
                let fileExtension = file.name.split('.');
                /* istanbul ignore else */
                if(!config.extension.includes(fileExtension[--fileExtension.length]))
                    return  { extension: true };
            }
            /* istanbul ignore else */
            if(config.type) {
                /* istanbul ignore else */
                if(!config.type.includes(file.type))
                    return { type: true };
            }

        }
        return null;
    }
}