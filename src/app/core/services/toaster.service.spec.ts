import { TestBed } from '@angular/core/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { ToasterService } from './toaster.service';

describe('ToasterService', () => {
  let service: ToasterService;
  let toastrService: ToastrService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ToastrModule.forRoot({})
      ]
    });
  });

  beforeEach(() => {
    service = TestBed.inject(ToasterService);
    toastrService = TestBed.inject(ToastrService);
  })

  it('should create ToasterService.', () => {
    expect(service).toBeTruthy();
  });

  it('should open success toaster.', () => {
    spyOn(toastrService, 'success').and.returnValue(null);
    service.success('Success Toaster');
    expect(toastrService.success).toHaveBeenCalled();
  });

  it('should open info toaster.', () => {
    spyOn(toastrService, 'info').and.returnValue(null);
    service.info('Info Toaster');
    expect(toastrService.info).toHaveBeenCalled();
  });
  
  it('should open warning toaster.', () => {
    spyOn(toastrService, 'warning').and.returnValue(null);
    service.warning('Warning Toaster');
    expect(toastrService.warning).toHaveBeenCalled();
  });

  it('should open danger toaster.', () => {
    spyOn(toastrService, 'error').and.returnValue(null);
    service.danger('Danger Toaster');
    expect(toastrService.error).toHaveBeenCalled();
  });
});
