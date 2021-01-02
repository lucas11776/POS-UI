import { Injectable } from '@angular/core';
import { concatMap, tap } from 'rxjs/operators';
import { Observable, BehaviorSubject, of } from 'rxjs';

import { HttpService } from '../../../core/http/http.service';
import { Description, Profile, UploadProfilePicture } from '../../../shared/models/user.model';
import { UpdateAddress } from '../../../shared/models/address.model';
import { PersonalDetails } from '../../../shared/models/user.model';
import { Message } from '../../../shared/models/api.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private profileSubject = new BehaviorSubject<Profile>(null);
  profile$: Observable<Profile> = this.profileSubject.pipe(
    concatMap(profile => profile == null ? this.fetchProfile() : of(profile))
  );

  constructor(private _http: HttpService) { }

  fetchProfile(): Observable<Profile> {
    return this._http.get<Profile>('user').pipe(
      tap(profile => this.profileSubject.next(profile))
    );
  }

  updatePersonalDetails(form: PersonalDetails): Observable<Profile> {
    return this._http.patch<Profile>('user', form).pipe(
      tap(profile => this.profileSubject.next(profile))
    );
  }

  updateAddress(form: UpdateAddress): Observable<Profile> {
    return this._http.patch<Profile>('user/address', form).pipe(
      tap(profile => this.profileSubject.next(profile))
    );
  }

  updateDescription(form: Description): Observable<Profile> {
    return this._http.patch<Profile>('user/description', form).pipe(
      tap(profile => this.profileSubject.next(profile))
    );
  }

  uploadProfilePicture(form: UploadProfilePicture): Observable<Profile> {
    return this._http.post<Profile>('user/profile/picture', form).pipe(
      tap(profile => this.profileSubject.next(profile))
    );
  }

  resetProfilePicture(): Observable<Profile> {
    return this._http.delete<Profile>('user/profile/picture').pipe(
      tap(profile => this.profileSubject.next(profile))
    );
  }

  verifyEmail(): Observable<Message> {
    return this._http.post<Message>('api/user/verify/email', {});
  }
}
