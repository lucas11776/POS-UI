import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { concatMap, shareReplay, tap } from 'rxjs/operators';

import { HttpService } from '../http/http.service';
import { Country } from '../../shared/models/address.model';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private countriesSubject = new BehaviorSubject<Country[]>(null);
  countries$: Observable<Country[]> = this.countriesSubject.asObservable().pipe(
    concatMap(countries => countries == null ? this.fetchCountries() : of(countries)),
    shareReplay(1)
  );

  constructor(private _http: HttpService) { }

  fetchCountries(): Observable<Country[]> {
    return this._http.get<Country[]>('api/countries').pipe(
      tap(countries => this.countriesSubject.next(countries))
    );
  }
}
