import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';

import { UserGuard } from './user.guard';
import { TokenService } from '../authentication/token.service';
import { AuthenticationService } from '../authentication/authentication.service';
import { JwtOptionsProvider } from '../providers/jwtOptions.provider';
import { Token } from '../mocks/authentication.mock';

describe('UserGuard', () => {
  let guard: UserGuard;
  let tokenService: TokenService;
  let authenticationService: AuthenticationService;
  let cookieService: CookieService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        JwtModule.forRoot({ jwtOptionsProvider: JwtOptionsProvider })
      ]
    });
  });

  beforeEach(() => {
    guard = TestBed.inject(UserGuard);
    tokenService = TestBed.inject(TokenService);
    authenticationService = TestBed.inject(AuthenticationService);
    cookieService = TestBed.inject(CookieService);
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    spyOn(router, 'navigate').and.returnValue(new Promise<boolean>((rs,rj) => rs.call(true)));
  });

  afterEach(() => {
    cookieService.deleteAll();
  });

  it('should create User guard.', () => {
    expect(guard).toBeTruthy();
  });

  it('should check if user is loggedin guard return true.', () => {
    tokenService.store(Token());
    let allowed = guard.canActivate(<any>{}, <any>{});
    expect(allowed).toBeTrue();
  });

  it('should check if user is not loggedin guard return false.', () => {
    let allowed = guard.canActivate(<any>{}, <any>{});
    expect(allowed).toBeFalse();
  });

  it('should redirect user to login route is user is not logged in', () => {
    guard.canActivate(<any>{}, <any>{});
    expect(router.navigate).toHaveBeenCalled();
  });
});
