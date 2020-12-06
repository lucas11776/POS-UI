import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { SubSink } from 'subsink';

import { AuthenticationService } from '../../../core/authentication/authentication.service';
import { TokenService } from '../../../core/authentication/token.service';
import { Error } from '../../models/api.model';

@Component({
  selector: 'ks-logout-modal',
  templateUrl: './logout-modal.component.html',
  styleUrls: ['./logout-modal.component.css']
})
export class LogoutModalComponent implements OnDestroy {
  sub = new SubSink;
  error: Error = null;

  constructor(
    public _ngbActiveModal: NgbActiveModal,
    private _authenticationService: AuthenticationService,
    private _tokenService: TokenService,
    private _ngxSpinnerService: NgxSpinnerService,
    private _router: Router) { }

  logout(): void {
    this.error = null;
    this._ngxSpinnerService.show();
    this.sub.sink = this._authenticationService.logout()
      .subscribe(
        response => this.logoutSuccess(response),
        error => this.logoutFailed(error));
  }

  close(): void {
    this._ngbActiveModal.close();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  protected logoutSuccess(response: Response): void {
    this._tokenService.delete();
    this._ngbActiveModal.close();
    this._ngxSpinnerService.hide();
    this._router.navigate(['/', 'auth', 'login']);
  }

  protected logoutFailed(error: Error): void {
    this.error = error;
    this._ngxSpinnerService.hide();
  }
}
