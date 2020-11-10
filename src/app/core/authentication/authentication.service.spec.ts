import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CookieService } from 'ngx-cookie-service';
import { JwtModule } from '@auth0/angular-jwt';
import { of } from 'rxjs';

import { AuthenticationService } from './authentication.service';
import { HttpService } from '../http/http.service';
import { Register, Login, Token } from '../mocks/authentication.mock';
import { TokenService } from './token.service';
import { JwtOptionsProvider } from '../providers/jwtOptions.provider';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let httpService: HttpService;
  let tokenService: TokenService;
  let cookieService: CookieService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        JwtModule.forRoot({ jwtOptionsProvider: JwtOptionsProvider })
      ]
    });
  });

  beforeEach(() => {
    service = TestBed.inject(AuthenticationService);
    httpService = TestBed.inject(HttpService);
    tokenService = TestBed.inject(TokenService);
    cookieService = TestBed.inject(CookieService);
  });

  afterEach(() => {
    cookieService.deleteAll();
  });

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
  }));

  it('should check loggedin return false if user is not loggedin.', () => {
    expect(service.loggedin()).toBeFalse();
  });

  it('should check loggedin return true if user is loggedin.', () => {
    tokenService.store(Token());
    expect(service.loggedin()).toBeTrue();
  });
});
