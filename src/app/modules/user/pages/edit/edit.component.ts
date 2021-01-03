import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SubSink } from 'subsink';

import { UserService } from '../../shared/user.service';
import { Profile, UploadProfilePicture } from '../../../../shared/models/user.model';
import { Error } from '../../../../shared/models/api.model';

@Component({
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy {
  updatePersonalDetailsError: Error;
  uploadProfilePictureError: Error;
  updateDescriptionError: Error;
  updateAddressError: Error;
  sub = new SubSink;

  constructor(
    private _ngxSpinnerService: NgxSpinnerService,
    private _userService: UserService) { }

  ngOnInit(): void {
  }

  uploadProfilePicture(event$: UploadProfilePicture): void {
    this.uploadProfilePictureError = null;
    this._ngxSpinnerService.show();
    this.sub.sink = this._userService.uploadProfilePicture(event$)
      .subscribe(
        profile => this.uploadProfilePictureSuccess(profile),
        error => this.uploadProfilePictureFailed(error));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  protected uploadProfilePictureSuccess(profile: Profile): void {
    this._ngxSpinnerService.hide();
  }

  protected uploadProfilePictureFailed(error: Error): void {
    this.uploadProfilePictureError = error;
    this._ngxSpinnerService.hide();
  }
}
