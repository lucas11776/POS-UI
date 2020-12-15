import { TestBed } from '@angular/core/testing';
import { RendererFactory2, Renderer2, ElementRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, NgControl } from '@angular/forms';

import { FileDirective } from './file.directive';
import { _File, FileList } from '../../core/mocks/file.mock';

describe('FileDirective', () => {
  let directive: FileDirective;
  let formBuilder: FormBuilder;
  let form: FormGroup;
  let ngControl: NgControl;
  let renderer: Renderer2;
  let elementRef: ElementRef;

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
    elementRef = new ElementRef(document.createElement('input'));
    renderer = TestBed.inject(RendererFactory2).createRenderer(null, null);
    directive = new FileDirective(ngControl, elementRef, renderer);
  });

  it('should create File directive.', () => {
    expect(directive).toBeTruthy();
  });

  it('should if multiple is true check if multiple attributes is added.', () => {
    directive.multiple = true;
    directive.ngOnInit();
    expect(elementRef.nativeElement.attributes.getNamedItem('multiple')).toBeInstanceOf(Attr);
  });

  it('should assign single file in file list if change event is trigged and multiple attribute is not set.', () => {
    let fileList = FileList([_File('pic.png', 'image/png')]);
    directive.inputChange(fileList);
    expect(form.value.image).toEqual(fileList[0]);
  });

  it('should assign file list is change event is trigged and multiple attribute isset.', () => {
    let fileList = FileList([_File('pic.png', 'image/png')]);
    directive.multiple = true;
    directive.inputChange(fileList);
    expect(form.value.image).toEqual(fileList);
  });
});
