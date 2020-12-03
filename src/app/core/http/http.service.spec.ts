import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { HttpService } from './http.service';
import { of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

describe('HttpService', () => {
  let service: HttpService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
  });

  beforeEach(() => {
    service = TestBed.inject(HttpService);
    httpClient = TestBed.inject(HttpClient);
  })

  it('should create HttpService.', () => {
    expect(service).toBeTruthy();
  });

  it('should check if HttpService has a get method.', fakeAsync(() => {
    let fruits = ['apple', 'banana', 'tomato'];
    spyOn(httpClient, 'get').and.returnValue(of(fruits));
    service.get('fruits').subscribe(f => expect(f).toBe(fruits));
    tick();
  }));

  it('should check if HttpService has a post method.', fakeAsync(() => {
    let response = { message: 'Friut has been added.' };
    spyOn(httpClient, 'post').and.returnValue(of(response));
    service.post('fruits', 'orange').subscribe(r => expect(r).toBe(response));
    tick();
  }));

  it('should check if HttpService has a patch method.', fakeAsync(() => {
    let response = { message: 'Friut has been updated.' };
    spyOn(httpClient, 'patch').and.returnValue(of(response));
    service.patch('fruits', {orange: 'Red Orange'}).subscribe(r => expect(r).toBe(response));
    tick();
  }));

  it('should check if HttpService has a put method.', fakeAsync(() => {
    let response = { message: 'Friut has been updated.' };
    spyOn(httpClient, 'put').and.returnValue(of(response));
    service.put('fruits', {orange: 'Red Orange'}).subscribe(r => expect(r).toBe(response));
    tick();
  }));

  it('should check if HttpService has a delete method.', fakeAsync(() => {
    let response = { message: 'Friut has been deleted.' };
    spyOn(httpClient, 'delete').and.returnValue(of(response));
    service.delete('fruits/apple').subscribe(r => expect(r).toBe(response));
    tick();
  }));

  it('should get error from http client.', fakeAsync(() => {
    const error = { message: 'Something went wrong please try again.' };
    const thrownError = service.error(new HttpErrorResponse({ error: error }));
    thrownError.subscribe(_=>_, err => expect(err).toEqual(error));
    tick();
  }));

  it('should get error from message if error in failed request is not set.', fakeAsync(() => {
    let httpErrorResponse = new HttpErrorResponse({ status: 500 });
    const thrownError = service.error(httpErrorResponse);
    thrownError.subscribe(_=>_, err => expect(err.message).toBe(httpErrorResponse.message));
    tick();
  }));
});
