import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';

import { CreateCategory } from '../../models/category.model';
import { Errors } from '../../errors/form.error';

@Component({
  selector: 'ks-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {
  @Output('create') createEvent = new EventEmitter<CreateCategory>();
  formErrors = Errors;
  form: FormGroup;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      name: [null, [RxwebValidators.required(), RxwebValidators.minLength({ value: 5 }), RxwebValidators.maxLength({ value: 50 })]]
    });
  }

  create() {
    this.createEvent.emit(this.form.value);
  }
}
