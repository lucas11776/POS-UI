import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';

import { Address } from '../../../../shared/models/address.model';
import { Errors } from '../../../../shared/errors/form.error';

@Component({
  selector: 'ks-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.css']
})
export class EditAddressComponent implements OnInit {
  @Output('update') updateEvent = new EventEmitter<Address>();
  @Input('address') address: Address = <any>{};
  formErrors = Errors;
  form: FormGroup;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      address: [this.address.address || null, []],
      country: [this.address.country || null, []],
      city: [this.address.city || null, []],
      postal_code: [this.address.postal_code || null, []],
    });
  }

}
