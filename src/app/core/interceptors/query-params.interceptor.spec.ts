import { NgZone } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

import { QueryParamsInterceptor } from './query-params.interceptor';

describe('QueryParamsInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let router: Router;
  let ngZone: NgZone;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      HttpClientTestingModule,
    ],
    providers: [
      { provide: HTTP_INTERCEPTORS, useClass: QueryParamsInterceptor, multi: true }
    ]
  }));

  beforeEach(() => {
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    router = TestBed.inject(Router);
    ngZone = TestBed.inject(NgZone);
    httpMock.verify();
  });

  it('should check when QueryParams interceptor is called it assign application params to the request.', fakeAsync(() => {
    const params = { name: 'TestingRouter' };
    ngZone.run(_ => router.navigate([], { queryParams: params }));
    tick();
    httpClient.get('users', ).subscribe();
    const request  = httpMock.expectOne(`users?name=${params.name}`).request;
    expect(request.params.get('name')).toBe(params.name);
  }));
});