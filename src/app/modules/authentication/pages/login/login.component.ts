import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';

import { Errors } from '../../../../shared/errors/form.error';
import { AuthenticationService } from '../../../../core/authentication/authentication.service';
import { TokenService } from '../../../../core/authentication/token.service';
import { Token } from '../../../../shared/models/authentication.model';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup;
  formErrors = Errors;
  loginSubscription: Subscription;
  error;

  constructor(
    private _formBuilder: FormBuilder,
    private _authenticationService: AuthenticationService,
    private _ngxSpinnerService: NgxSpinnerService,
    private _tokenService: TokenService,
    private _router: Router) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      username: [null, [RxwebValidators.required()]],
      password: [null, [RxwebValidators.required()]]
    });
  }

  login(): void {
    this.error = null;
    this._ngxSpinnerService.show();
    this.loginSubscription = this._authenticationService.login<Token>(this.form.value)
      .subscribe(token => this.loggedin(token), error => this.loginFailed(error));
  }

  ngOnDestroy(): void {
    if(this.loginSubscription) this.loginSubscription.unsubscribe();
  }

  protected loggedin(token: Token): void {
    this._tokenService.store(token);
    this._ngxSpinnerService.hide();
    this._router.navigate(['/']);
  }

  protected loginFailed(error: Error): void {
    this.error = error;
    this._ngxSpinnerService.hide();
  }
}
