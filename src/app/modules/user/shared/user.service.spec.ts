import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { UserService } from './user.service';
import { HttpService } from '../../../core/http/http.service';
import {
  Profile as ProfileMock,
  PersonalDetails as PersonalDetailsMock,
  UploadProfilePicture as UploadProfilePictureMock,
  Description as DescriptionMock
} from '../../../core/mocks/user.mock';
import { Roles as RolesMock } from '../../../core/mocks/role.mock';
import { Address as AddressMock, UpdateAddress as UpdateAddressMock } from '../../../core/mocks/address.mock';
import { Profile } from 'src/app/shared/models/user.model';

describe('UserService', () => {
  let service: UserService;
  let httpService: HttpService;
  let profile: Profile;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
  });

  beforeEach(() => {
    service = TestBed.inject(UserService);
    httpService = TestBed.inject(HttpService);
    profile = ProfileMock();
  });

  it('should check if User service is created.', () => {
    expect(service).toBeTruthy();
  });

  it('should get user profile from subject.', fakeAsync(() => {
    spyOn(httpService, 'get').and.returnValue(of(profile));
    service.profile$
      .subscribe(p => expect(p).toEqual(profile));
    tick();
  }));

  it('should fetch user profile user.', fakeAsync(() => {
    spyOn(httpService, 'get').and.returnValue(of(profile));
    service.fetchProfile()
      .subscribe(p => expect(p).toEqual(profile));
    tick();
  }));

  it('should update user personal details.', fakeAsync(() => {
    spyOn(httpService, 'patch').and.returnValue(of(profile));
    service.updatePersonalDetails(PersonalDetailsMock())
      .subscribe(p => expect(p).toEqual(profile));
    tick();
  }));

  it('should update user address.', fakeAsync(() => {
    spyOn(httpService, 'patch').and.returnValue(of(profile));
    service.updateAddress(UpdateAddressMock())
      .subscribe(p => expect(p).toEqual(profile));
    tick();
  }));

  it('should update user description', fakeAsync(() => {
    spyOn(httpService, 'patch').and.returnValue(of(profile));
    service.updateDescription(DescriptionMock())
      .subscribe(p => expect(p).toEqual(profile));
    tick();
  }));

  it('should upload user profile picture.', fakeAsync(() => {
    spyOn(httpService, 'post').and.returnValue(of(profile));
    service.uploadProfilePicture(UploadProfilePictureMock())
      .subscribe(p => expect(p).toEqual(profile));
  }));

  it('should reset user profile picture to default profile picture.', fakeAsync(() => {
    spyOn(httpService, 'delete').and.returnValue(of(profile));
    service.resetProfilePicture()
      .subscribe(p => expect(p).toEqual(profile));
    tick();
  }));

  it('should verify email address.', fakeAsync(() => {
    const message = { message: 'Email verification link has been sent to you inbox.' };
    spyOn(httpService, 'post').and.returnValue(of(message));
    service.verifyEmail()
      .subscribe(msg => expect(msg).toEqual(message));
    tick();
  }));
});
