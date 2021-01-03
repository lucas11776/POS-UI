import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { of, throwError } from 'rxjs';

import { EditComponent } from './edit.component';
import { UserService } from '../../shared/user.service';
import { UserModule } from '../../user.module';
import { SharedModule } from '../../../../shared/shared.module';
import { _File as FileMock } from '../../../../core/mocks/file.mock';
import { UpdateAddress as UpdateAddressMock } from '../../../../core/mocks/address.mock';
import {
  Profile as ProfileMock,
  PersonalDetails as PersonalDetailsMock
} from '../../../../core/mocks/user.mock';

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;
  let ngxSpinnerService: NgxSpinnerService;
  let userService: UserService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EditComponent
      ],
      imports: [
        UserModule,
        SharedModule,
        RouterTestingModule,
        HttpClientTestingModule,
        NgxSpinnerModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    ngxSpinnerService = TestBed.inject(NgxSpinnerService);
    userService = TestBed.inject(UserService);
    fixture.detectChanges();
  });

  beforeEach(() => {
    spyOn(ngxSpinnerService, 'show').and.returnValue();
    spyOn(ngxSpinnerService, 'hide').and.returnValue();
  });

  it('should check if Edit component is created.', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Update Personal Details Testcases
   */

  it('should clear updatePersonalDetailsError when updatePersonalDetails is called.', () => {
    component.updatePersonalDetailsError = { message: 'Something went wrong please try again later...' };
    component.updatePersonalDetails(PersonalDetailsMock());
    expect(component.updatePersonalDetailsError).toBeNull();
  });

  it('should display spinner when updating personal details.', () => {
    component.updatePersonalDetails(PersonalDetailsMock());
    expect(ngxSpinnerService.show).toHaveBeenCalled();
  });

  it('should close spinner when updatePersonalDetails request was successfully.', fakeAsync(() => {
    spyOn(userService, 'updatePersonalDetails').and.returnValue(of(ProfileMock()));
    component.updatePersonalDetails(PersonalDetailsMock());
    tick();
    expect(ngxSpinnerService.hide).toHaveBeenCalled();
  }));

  it('should assing updatePersonalDetails error to updatePersonalDetailsError if update personal details request failed.', fakeAsync(() => {
    let error = { message: 'Something went wrong please try again later...' };
    spyOn(userService, 'updatePersonalDetails').and.returnValue(throwError(error));
    component.updatePersonalDetails(PersonalDetailsMock());
    tick();
    expect(component.updatePersonalDetailsError).toEqual(error);
  }));

  it('should close spinner when update personal details request failed.', fakeAsync(() => {
    spyOn(userService, 'updatePersonalDetails').and.returnValue(throwError({ message: 'Something went wrong please try again later....' }));
    component.updatePersonalDetails(PersonalDetailsMock());
    tick();
    expect(ngxSpinnerService.hide).toHaveBeenCalled();
  }));
  
  /**
   * Upload Profile Picture Testcases
   */

  it('should clear upload profile picture error when uploadProfilePicture is called.', () => {
    component.uploadProfilePictureError = { message: 'Something went wrong please try again later...' };
    component.uploadProfilePicture({ image: FileMock('img.png', 'image/png') });
    expect(component.uploadProfilePictureError).toBeNull();
  });

  it('should display spinner when uploading profile picture.', () => {
    component.uploadProfilePicture({ image: FileMock('img.png', 'image/png') });
    expect(ngxSpinnerService.show).toHaveBeenCalled();
  });

  it('should close spinner after profile picture was uploaded successfully.', fakeAsync(() => {
    spyOn(userService, 'uploadProfilePicture').and.returnValue(of(ProfileMock()));
    component.uploadProfilePicture({ image: FileMock('img.png', 'image/png') });
    tick();
    expect(ngxSpinnerService.hide).toHaveBeenCalled();
  }));

  it('should assing uploadProfilePicture error to uploadProfilePictureError if upload profile picture request failed.', fakeAsync(() => {
    let error = { message: 'Something went wrong please try again later...' };
    spyOn(userService, 'uploadProfilePicture').and.returnValue(throwError(error));
    component.uploadProfilePicture({ image: FileMock('img.png', 'image/png') });
    tick();
    expect(component.uploadProfilePictureError).toEqual(error);
  }));

  it('should close spinner when upload profile picture request failed.', fakeAsync(() => {
    spyOn(userService, 'uploadProfilePicture').and.returnValue(throwError({ message: 'Something went wrong please try again later....' }));
    component.uploadProfilePicture({ image: FileMock('img.png', 'image/png') });
    tick();
    expect(ngxSpinnerService.hide).toHaveBeenCalled();
  }));

  /**
   * Update Address Testcases
   */

  it('should clear updateAddressError when update address is called.', () => {
    component.updateAddressError = { message: 'Something went wrong please try again later...' };
    component.updateAddress(UpdateAddressMock());
    expect(component.updateAddressError).toBeNull();
  });

  it('should display spinner when making update address request.', () => {
    component.updateAddress(UpdateAddressMock());
    expect(ngxSpinnerService.show).toHaveBeenCalled();
  });

  it('should close spinner when update address request is complete.', fakeAsync(() => {
    spyOn(userService, 'updateAddress').and.returnValue(of(ProfileMock()));
    component.updateAddress(UpdateAddressMock());
    tick();
    expect(ngxSpinnerService.hide).toHaveBeenCalled();
  }));

  it('should assign updateAddress error to updateAddressError if update address request failed.', fakeAsync(() => {
    let error = { message: 'Something went wrong please try again later...' };
    spyOn(userService, 'updateAddress').and.returnValue(throwError(error));
    component.updateAddress(UpdateAddressMock());
    tick();
    expect(component.updateAddressError).toEqual(error);
  }));

  it('should close spinner when update addres request failed.', fakeAsync(() => {
    spyOn(userService, 'updateAddress').and.returnValue(throwError({ message: 'Something went wrong please try again later....' }));
    component.updateAddress(UpdateAddressMock());
    tick();
    expect(ngxSpinnerService.hide).toHaveBeenCalled();
  }));

});
