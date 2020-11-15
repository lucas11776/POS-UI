import { AbstractControl, ValidatorFn } from '@angular/forms';

import { WordsConfig } from './extension/words.config';

export const words = (config: WordsConfig): ValidatorFn => {
    return (control: AbstractControl) => {
        const value = control.value;
        if(typeof value == 'string') {
            const numberOfWords = value.split(' ').length;
            /* istanbul ignore else */
            if(config.minWords && numberOfWords < config.minWords) {
                return { minWords: true };
            }
            /* istanbul ignore else */
            if(config.maxWords && numberOfWords > config.maxWords) {
                return { maxWords: true };
            } 
        }
        return null;
    }
}