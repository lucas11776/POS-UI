import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';

import { Address } from '../../../../shared/models/address.model';
import { Errors } from '../../../../shared/errors/form.error';
import { CountriesService } from '../../../../core/services/countries.service';
import { country } from '../../../../core/validators/form-validators';

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

  constructor(
    private _formBuilder: FormBuilder,
    private _countriesService: CountriesService) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      address: [this.address.address || null, [RxwebValidators.pattern({ expression: { invalid: /^\d+\s[A-z]+\s[A-z]+/g } })]],
      country_id: [this.address.country?.id || null, []],
      city: [this.address.city || null, [RxwebValidators.minLength({ value: 3 }), RxwebValidators.maxLength({ value: 50 })]],
      postal_code: [this.address.postal_code || null, [RxwebValidators.pattern({ expression: { invalid: /^\d{4,10}/ } })]],
    });
  }
}
