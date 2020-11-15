import { TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, NgControl } from '@angular/forms';

import { FileDirective } from './file.directive';
import { _File, FileList } from '../../core/mocks/file.mock';

describe('FileDirective', () => {
  let directive: FileDirective;
  let formBuilder: FormBuilder;
  let form: FormGroup;
  let ngControl: NgControl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
    });
  });

  beforeEach(() => {
    formBuilder = TestBed.inject(FormBuilder);
    form = formBuilder.group({'image': [null, []]});
    ngControl = <NgControl>{control: form.controls.image};
    directive = new FileDirective(ngControl);
  });

  it('should create File directive.', () => {
    expect(directive).toBeTruthy();
  });

  it('should assign single file in file list if change event is trigged and multiple attribute is not set.', () => {
    let fileList = FileList([_File('pic.png', 'image/png')]);
    directive.inputChange(fileList);
    expect(form.value.image).toEqual(fileList[0]);
  });

  it('should assign file list is change event is trigged and multiple attribute isset.', () => {
    let fileList = FileList([_File('pic.png', 'image/png')]);
    directive.multiple = '';
    directive.inputChange(fileList);
    expect(form.value.image).toEqual(fileList);
  });
});
