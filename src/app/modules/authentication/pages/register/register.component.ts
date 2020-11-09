import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';

import { Gender } from '../../../../shared/models/gender.model';
import { Errors } from '../../../../shared/errors/form.error';
import { Register } from '../../../../shared/models/authentication.model';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  gender: string[] = Gender;
  formErrors = Errors;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      'first_name': [null, [RxwebValidators.required(), RxwebValidators.minLength({ value: 3 }), RxwebValidators.maxLength({ value: 50 })]],
      'last_name': [null, [RxwebValidators.required(), RxwebValidators.minLength({ value: 3 }), RxwebValidators.maxLength({ value: 50 })]],
      'gender': ['', [RxwebValidators.oneOf({ matchValues: Gender })]],
      'email': [null, [RxwebValidators.required({ conditionalExpression: this.cellphoneNotEmpty }), RxwebValidators.email()]],
      'cellphone_number': [null, [RxwebValidators.required({ conditionalExpression: this.emailNotEmpty }), RxwebValidators.pattern({expression: { pattern: /\+[0-9]{12,12}/ }})]],
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

  register() {
    console.log(this.form.value);
  }
}
