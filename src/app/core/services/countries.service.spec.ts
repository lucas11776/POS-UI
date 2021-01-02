import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { CountriesService } from './countries.service';
import { HttpService } from '../http/http.service';
import { Countries as CountriesMock } from '../mocks/address.mock';
import { Country } from '../../shared/models/address.model';

describe('CountriesService', () => {
  let service: CountriesService;
  let httpService: HttpService;
  let countries: Country[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
  });

  beforeEach(() => {
    service = TestBed.inject(CountriesService);
    httpService = TestBed.inject(HttpService);
    countries = CountriesMock();
  })

  it('should check if Counties service is created.', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch countries.', fakeAsync(() => {
    spyOn(httpService, 'get').and.returnValue(of(countries));
    service.fetchCountries()
      .subscribe(c => expect(c).toEqual(countries));
    tick();
  }));

  it('should get countries from countries$ subject.', fakeAsync(() => {
    spyOn(httpService, 'get').and.returnValue(of(countries));
    service.countries$
      .subscribe(c => expect(c).toEqual(countries));
    tick();
  }));
  
});
