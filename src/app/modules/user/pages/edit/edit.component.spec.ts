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
import { Profile as ProfileMock } from '../../../../core/mocks/user.mock';

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

  it('should check UploadProfilePicture error when making the request to upload profile picture.', () => {
    component.uploadProfilePictureError = { message: 'Something went wrong' };
    component.uploadProfilePicture({ image: FileMock('img.png', 'image/png') });
    expect(component.uploadProfilePictureError).toBeNull();
  });

  it('should display spinner when making required to upload profile picture.', () => {
    component.uploadProfilePicture({ image: FileMock('img.png', 'image/png') });
    expect(ngxSpinnerService.show).toHaveBeenCalled();
  });

  it('should close spinner after profile picture was uploaded successfully.', fakeAsync(() => {
    spyOn(userService, 'uploadProfilePicture').and.returnValue(of(ProfileMock()));
    component.uploadProfilePicture({ image: FileMock('img.png', 'image/png') });
    tick();
    expect(ngxSpinnerService.hide).toHaveBeenCalled();
  }));

  it('should assign error to local variable if upload profile picture request failed.', fakeAsync(() => {
    let error = { message: 'Something went wrong' };
    spyOn(userService, 'uploadProfilePicture').and.returnValue(throwError(error));
    component.uploadProfilePicture({ image: FileMock('img.png', 'image/png') });
    tick();
    expect(component.uploadProfilePictureError).toEqual(error);
  }));

  it('should close spinner when upload profile picture request failed.', fakeAsync(() => {
    spyOn(userService, 'uploadProfilePicture').and.returnValue(throwError({ message: 'Something went wrong.' }));
    component.uploadProfilePicture({ image: FileMock('img.png', 'image/png') });
    tick();
    expect(ngxSpinnerService.hide).toHaveBeenCalled();
  }));
});
