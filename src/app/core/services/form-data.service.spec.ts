import { TestBed } from '@angular/core/testing';

import { FormDataService } from './form-data.service';
import { FileList, _File } from '../mocks/file.mock';

describe('FormDataService', () => {
  let service: FormDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormDataService);
  });

  it('should check if Service component is created.', () => {
    expect(service).toBeTruthy();
  });

  it('should covert object to FormData.', () => {
    let obj = { name: 'John Banks' };
    let formData = service.convert(obj);
    expect(formData.get('name')).toBe(obj['name']);
  });

  it('should add files list in to FormDate', () => {
    let fileList = {images: FileList([_File('pic.png', 'image/png')])};
    let formData = service.convert(fileList);
    expect(formData.get('images[]')).toEqual(fileList.images.item(0));
  });
});
