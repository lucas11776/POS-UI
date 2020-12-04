import { TestBed } from '@angular/core/testing';
import { CookieService } from 'ngx-cookie-service';

import { TokenService } from './token.service';
import { Token } from '../../shared/models/authentication.model';
import { Token as TokenMock } from '../mocks/authentication.mock';

describe('TokenService', () => {
  let service: TokenService;
  let cookieService: CookieService;
  let token: Token;

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  beforeEach(() => {
    service = TestBed.inject(TokenService);
    cookieService = TestBed.inject(CookieService);
    token = TokenMock();
  });

  afterEach(() => {
    cookieService.deleteAll();
  });

  it('should create TokenService.', () => {
    expect(service).toBeTruthy();
  });

  it('should store user token in cookie.', () => {
    service.store(token);
    expect(document.cookie).toContain(token.token);
    expect(document.cookie).toContain(token.type);
  });

  it('should get user token.', () => {
    service.store(token);
    expect(service.token()).toBe(token.token);
  });

  it('should get full request token with token type', () => {
    service.store(token);
    expect(service.get()).toBe(`${token.type} ${token.token}`);
  });

  it('should remove token from cookies if delete is called.', () => {
    service.store(token);
    service.delete();
    expect(service.get()).toBe('');
  });
});
