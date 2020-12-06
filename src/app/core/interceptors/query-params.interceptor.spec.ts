import { fakeAsync, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

import { QueryParamsInterceptor } from './query-params.interceptor';

describe('QueryParamsInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      HttpClientTestingModule,
    ],
    providers: [
      {
        provide: HTTP_INTERCEPTORS, useClass: QueryParamsInterceptor, multi: true
      }
    ]
  }));

  beforeEach(() => {
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    httpMock.verify();
  });

  it('should check when QueryParams interceptor is called it assign application params to the request.', fakeAsync(() => {
    httpClient.get('users', ).subscribe();
    const request  = httpMock.expectOne('users').request;
  }));
});
