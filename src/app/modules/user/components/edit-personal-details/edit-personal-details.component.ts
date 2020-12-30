import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';

import { PersonalDetails } from '../../../../shared/models/user.model';
import { Gender } from '../../../../shared/models/gender.model';
import { Errors } from '../../../../shared/errors/form.error';

@Component({
  selector: 'ks-edit-personal-details',
  templateUrl: './edit-personal-details.component.html',
  styleUrls: ['./edit-personal-details.component.css']
})
export class EditPersonalDetailsComponent implements OnInit {
  @Output('update') updateEvent = new EventEmitter<PersonalDetails>();
  @Input('user') user: PersonalDetails = <any>{};
  formErrors = Errors;
  form: FormGroup;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      first_name: [this.user.first_name || null, [RxwebValidators.required(), RxwebValidators.minLength({ value: 3 }), RxwebValidators.maxLength({ value: 50 })]],
      last_name: [this.user.last_name || null , [RxwebValidators.required(), RxwebValidators.minLength({ value: 3 }), RxwebValidators.maxLength({ value: 50 })]],
      gender: [this.user.gender || '', [RxwebValidators.oneOf({ matchValues: Gender })]],
    });
  }

}
