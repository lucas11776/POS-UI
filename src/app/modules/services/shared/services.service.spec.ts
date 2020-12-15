import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { ServicesService } from './services.service';
import { Service as ServiceMock, CreateService as CreateServiceMock } from '../../../core/mocks/service.mock';
import { Pagination } from '../../../core/mocks/pagination.mock';
import { HttpService } from '../../../core/http/http.service';


describe('ServicesService', () => {
  let service: ServicesService;
  let httpService: HttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
  });

  beforeEach(() => {
    service = TestBed.inject(ServicesService);
    httpService = TestBed.inject(HttpService);
  });

  it('should check if Services service is created.', () => {
    expect(service).toBeTruthy();
  });

  it('should make request to get all services from store.', fakeAsync(() => {
    const services = [ServiceMock(), ServiceMock(), ServiceMock()];
    spyOn(httpService, 'get').and.returnValue(of(services));
    service.all().subscribe(s => expect(s).toEqual(services));
    tick();
  }));

  it('should make a request to get services from api.', fakeAsync(() => {
    const services = Pagination([ServiceMock(), ServiceMock()], 10);
    spyOn(httpService, 'get').and.returnValue(of(services));
    service.get().subscribe(s => expect(s).toEqual(services));
    tick();
  }));

  it('should make a request to create service from api.', fakeAsync(() => {
    const response = ServiceMock()
    spyOn(httpService, 'post').and.returnValue(of(response));
    service.create(CreateServiceMock()).subscribe(s => expect(s).toEqual(response));
    tick();
  }));
});
