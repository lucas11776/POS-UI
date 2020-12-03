import { TestBed, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

import { FormDataInterceptor } from './form-data.interceptor';

describe('FormDataInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ],
    providers: [
      {
        provide: HTTP_INTERCEPTORS, useClass: FormDataInterceptor, multi: true
      }
      ]
  }));

  beforeEach(() => {
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should check if object if converted to FormData object.', fakeAsync(() => {
    httpClient.patch('user', {}).subscribe();
    const request = httpMock.expectOne('user').request;
    expect(request.body).toBeInstanceOf(FormData);
  }));

  it('should check if form data contain object key:value pair.', fakeAsync(() => {
    const form = { name: 'Joe' };
    httpClient.patch('user', form).subscribe();
    const request = httpMock.expectOne('user').request;
    expect(request.body.get('name')).toBe(form.name);
  }));

  it('should make request with empty body.', fakeAsync(() => {
    httpClient.get('user').subscribe();
    httpMock.expectOne('user');
  }));
});
