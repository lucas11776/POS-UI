import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';

import { Category, UpdateCategory } from '../../models/category.model';

@Component({
  selector: 'ks-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {
  @Output('update') updateEvent = new EventEmitter<UpdateCategory>();
  @Input('category') category: Category;
  form: FormGroup;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      id: [this.category.id, [RxwebValidators.required()]],
      name: [this.category.name, [RxwebValidators.required(), RxwebValidators.minLength({ value: 5 }), RxwebValidators.maxLength({ value: 50 })]]
    });
  }

  update(): void {
    this.updateEvent.emit(this.form.value);
  }
}
