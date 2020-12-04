import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { map } from 'rxjs/operators';
import { SubSink } from 'subsink';

import { CreateCategory } from '../../models/category.model';
import { Errors } from '../../errors/form.error';
import { Event, EventBusService } from '../../../core/services/event-bus.service';

@Component({
  selector: 'ks-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {
  @Output('create') createEvent = new EventEmitter<CreateCategory>();
  formErrors = Errors;
  form: FormGroup;
  sub = new SubSink;

  constructor(
    private _formBuilder: FormBuilder,
    private _eventBus: EventBusService) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      name: [null, [RxwebValidators.required(), RxwebValidators.minLength({ value: 5 }), RxwebValidators.maxLength({ value: 50 })]]
    });
    this.sub.sink = this._eventBus.event
      .pipe(map(e => e.name == 'CATEGORY_CREATED'))
      .subscribe(_ => this.form.reset());
  }

  create() {
    this.createEvent.emit(this.form.value);
  }
}
