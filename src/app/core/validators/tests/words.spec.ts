import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import faker from 'faker';

import { words as Words } from '../form-validators';

describe('WordsValidator', () => {
    let formGroup: FormGroup;
    let formBuilder: FormBuilder;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule
            ]
        });
    });

    beforeEach(() => {
        formBuilder = TestBed.inject(FormBuilder);
    });

    it('should be less then number of required words.', () => {
        formGroup = formBuilder.group({ description: [null, [ Words({ minWords: 10 }) ]] });
        formGroup.setValue({ description: faker.random.words(5) });
        expect(formGroup.controls.description.errors).toEqual({ minWords: true });
    });

    it('should be greater then number of required words.', () => {
        formGroup = formBuilder.group({ description: [null, [ Words({ maxWords: 10 }) ]] });
        formGroup.setValue({ description: faker.random.words(15) });
        expect(formGroup.controls.description.errors).toEqual({ maxWords: true });
    });
});