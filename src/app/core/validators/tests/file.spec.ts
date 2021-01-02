import { TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { file } from '../form-validators';
import { _File as FileMock } from '../../mocks/file.mock';

describe('File Validator', () => {
    let formBuilder: FormBuilder;
    let formGroup: FormGroup;

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

    it('should return null when file in init.', () => {
        formGroup = formBuilder.group({ file: [null, [file({})]] });
        expect(formGroup.controls.file.errors).toBeNull();
    });

    it('should check if File validator returns minSize error if file is less then minSize.', () => {
        formGroup = formBuilder.group({ file: [null, [file({ minSize: (1024 * 1024) * 2})]] });
        formGroup.setValue({ file: FileMock('img.png', 'image/png', 1024 * 1024) });
        expect(formGroup.controls.file.errors).toEqual({ minSize: true });
    });

    it('should check if File validator returns maxSize error if file size is greater then maxSize.', () => {
        formGroup = formBuilder.group({ file: [null, [file({ maxSize: 1024 * 1024})]] });
        formGroup.setValue({ file: FileMock('img.png', 'image/png', (1024 * 1024) * 2) });
        expect(formGroup.controls.file.errors).toEqual({ maxSize: true });
    });

    it('should check if File validator returns extension error if file extension does not match array extension.', () => {
        formGroup = formBuilder.group({ file: [null, [file({ extension: ['png', 'jpg']})]] });
        formGroup.setValue({ file: FileMock('img.git', 'image/png', 1024)});
        expect(formGroup.controls.file.errors).toEqual({ extension: true });
    });

    it('should check if File validator returns type error is invalid file type.', () => {
        formGroup = formBuilder.group({ file: [null, [file({ type: ['image/mp4']})]] });
        formGroup.setValue({ file: FileMock('img.mp3', 'image/mp3', 1024 * 1024)});
        expect(formGroup.controls.file.errors).toEqual({ type: true });
    });
});