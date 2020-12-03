import { fakeAsync, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { TokenInterceptor } from './token.interceptor';
import { Token } from '../../shared/models/authentication.model';
import { Token as TokenMock } from '../../core/mocks/authentication.mock';
import { TokenService } from '../../core/authentication/token.service';

describe('TokenInterceptor', () => {
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;
  let cookieService: CookieService;
  let tokenService: TokenService;
  let token: Token;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
    ],
    providers: [
      {
        provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true
      }
    ]
  }));

  beforeEach(() => {
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    cookieService = TestBed.inject(CookieService);
    tokenService = TestBed.inject(TokenService);
    token = TokenMock();
  });

  afterEach(() => {
    httpMock.verify();
    cookieService.deleteAll();
  });

  it('should check if token is attached in authorization header.', fakeAsync(() => {
    tokenService.store(token);
    httpClient.get('user').subscribe();
    const request = httpMock.expectOne('user').request;
    expect(request.headers.get('Authorization')).toBe(tokenService.get());
  }));
});
