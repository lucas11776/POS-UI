import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';

import { JwtOptionsProvider } from './jwtOptions.provider';
import { HttpService } from '../http/http.service';
import { Token } from '../mocks/authentication.mock';
import { TokenService } from '../authentication/token.service';
import { HttpClient } from '@angular/common/http';

describe('JwtOptionsProvider', () => {
    let httpMock: HttpTestingController;
    let cookieService: CookieService;
    let tokenService: TokenService;
    let httpClient: HttpClient;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                JwtModule.forRoot({ jwtOptionsProvider: JwtOptionsProvider }),
            ]
        });
    });

    beforeEach(() => {
        httpMock = TestBed.inject(HttpTestingController);
        cookieService = TestBed.inject(CookieService);
        tokenService = TestBed.inject(TokenService);
        httpClient = TestBed.inject(HttpClient);
        httpMock.verify();
    });

    afterEach(() => {
        cookieService.deleteAll();
    });

    it('should check if authorization header are attach in request headers.', () => {
        const URI = 'users'; 
        tokenService.store(Token());
        httpClient.get(URI).subscribe(res => expect(res).toBeTruthy());
        const httpRequest = httpMock.expectOne(`${URI}`);
        expect(httpRequest.request.headers.get('Authorization')).toBe(tokenService.get());
    });
});