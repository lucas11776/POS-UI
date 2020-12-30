import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';

import { Description, Profile } from '../../../../shared/models/user.model';
import { Errors } from '../../../../shared/errors/form.error';

@Component({
  selector: 'ks-edit-description',
  templateUrl: './edit-description.component.html',
  styleUrls: ['./edit-description.component.css']
})
export class EditDescriptionComponent implements OnInit {
  @Output('update') updateEvent = new EventEmitter<Description>();
  @Input('profile') profile: Partial<Profile> = <any>{};
  formErrors = Errors;
  form: FormGroup;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      description: [this.profile.description || null, []]
    });
  }

}
