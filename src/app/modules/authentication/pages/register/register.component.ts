import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';

import { AuthenticationService } from '../../../../core/authentication/authentication.service';
import { Gender } from '../../../../shared/models/gender.model';
import { Errors } from '../../../../shared/errors/form.error';
import { Register, Token } from '../../../../shared/models/authentication.model';
import { TokenService } from '../../../../core/authentication/token.service';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  form: FormGroup;
  formErrors = Errors;
  gender: string[] = Gender;
  registerSubscription: Subscription;
  error;

  constructor(
    private _formBuilder: FormBuilder,
    private _authenticationService: AuthenticationService,
    private _tokenService: TokenService,
    private _ngxSpinnerService: NgxSpinnerService,
    private _router: Router) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      'first_name': [null, [RxwebValidators.required(), RxwebValidators.minLength({ value: 3 }), RxwebValidators.maxLength({ value: 50 })]],
      'last_name': [null, [RxwebValidators.required(), RxwebValidators.minLength({ value: 3 }), RxwebValidators.maxLength({ value: 50 })]],
      'gender': ['', [RxwebValidators.oneOf({ matchValues: Gender })]],
      'email': [null, [RxwebValidators.required({ conditionalExpression: this.cellphoneNotEmpty }), RxwebValidators.email()]],
      'cellphone_number': [null, [RxwebValidators.required({ conditionalExpression: this.emailNotEmpty }), RxwebValidators.pattern({expression: { pattern: /\+[0-9]{11,11}/ }})]],
      'password': [null, [RxwebValidators.required(), RxwebValidators.minLength({ value: 8 }), RxwebValidators.maxLength({ value: 20 }), RxwebValidators.pattern({ expression: { pattern: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&])/ } })]],
      'password_confirmation': [null, [RxwebValidators.required(), RxwebValidators.compare({ fieldName: 'password' })]]
    });
  }

  cellphoneNotEmpty(form: Register): boolean {
    return ! form.cellphone_number;
  }

  emailNotEmpty(form: Register): boolean {
    return ! form.email;
  }

  register(): void {
    this.error = null;
    this._ngxSpinnerService.show();
    this.registerSubscription = this._authenticationService.register(this.form.value)
      .subscribe(token => this.registered(token), error => this.registrationFailed(error));
  }

  ngOnDestroy(): void {
    if(this.registerSubscription) this.registerSubscription.unsubscribe();
  }

  protected registered(token: Token): void {
    this._tokenService.store(token);
    this._ngxSpinnerService.hide();
    this._router.navigate(['/']);
  }

  protected registrationFailed(error: Error): void {
    console.log(error);
    this.error = error;
    this._ngxSpinnerService.hide();
  }
}
