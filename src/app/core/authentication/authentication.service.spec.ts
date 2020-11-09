import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { AuthenticationService } from './authentication.service';
import { HttpService } from '../http/http.service';
import { Register, Login, Token } from '../mocks/authentication.mock';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let httpService: HttpService; 

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
  });

  beforeEach(() => {
    service = TestBed.inject(AuthenticationService);
    httpService = TestBed.inject(HttpService);
  })

  it('should create AuthenticationService.', () => {
    expect(service).toBeTruthy();
  });

  it('should register user and return user token.', fakeAsync(() => {
    spyOn(httpService, 'post').and.returnValue(of(Token()));
    service.register(Register()).subscribe(t => expect(t).toEqual(Token()));
    tick();
  }));

  it('should login user and return user token.', fakeAsync(() => {
    spyOn(httpService, 'post').and.returnValue(of(Token()));
    service.login(Login()).subscribe(t => expect(t).toEqual(Token()));
    tick();
  }))
});
