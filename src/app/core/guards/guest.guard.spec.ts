import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { JwtModule } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';

import { GuestGuard } from './guest.guard';
import { TokenService } from '../authentication/token.service';
import { AuthenticationService } from '../authentication/authentication.service';
import { Token } from '../mocks/authentication.mock';
import { JwtOptionsProvider } from '../providers/jwtOptions.provider';

describe('GuestGuard', () => {
  let guard: GuestGuard;
  let tokenService: TokenService;
  let cookieService: CookieService;
  let toastrService: ToastrService;
  let authenticationService: AuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ToastrModule.forRoot({}),
        JwtModule.forRoot({ jwtOptionsProvider: JwtOptionsProvider }),
        HttpClientTestingModule
      ]
    });
  });

  beforeEach(() => {
    guard = TestBed.inject(GuestGuard);
    tokenService = TestBed.inject(TokenService);
    cookieService = TestBed.inject(CookieService);
    toastrService = TestBed.inject(ToastrService);
    authenticationService = TestBed.inject(AuthenticationService);
  });

  beforeEach(() => {
    spyOn(toastrService, 'error').and.returnValue(<any>{});
  });

  afterEach(() => {
    cookieService.deleteAll();
  });

  it('should create Guest guard.', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true if the user is not loggedin.', () => {
    let allowed = guard.canActivate(<any>{}, <any>{});
    expect(allowed).toBeTrue();
  });

  it('should return false if user if loggedin.', () => {
    tokenService.store(Token());
    let allowed = guard.canActivate(<any>{}, <any>{});
    expect(allowed).toBeFalse();
  });
});
