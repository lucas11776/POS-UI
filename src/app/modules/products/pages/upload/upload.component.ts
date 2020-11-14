import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';

import { Errors } from '../../../../shared/errors/form.error';

@Component({
  selector: 'ks-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  form: FormGroup;
  formErrors = Errors;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      image: [null, [RxwebValidators.required(), RxwebValidators.fileSize({ maxSize: (1024*1024)*3 })]],
      images: [null, [RxwebValidators.fileSize({ maxSize: (1024*1024)*3 }), RxwebValidators.file({ maxFiles: 5 })]],
      name: [null, [RxwebValidators.required(), RxwebValidators.minLength({ value: 5 }), RxwebValidators.maxLength({ value: 50 })]],
      price: [null, [RxwebValidators.required(), RxwebValidators.numeric()]],
      discount: [null, [RxwebValidators.numeric()]],
      category_id: [null, []],
      in_stock: [null, [RxwebValidators.required(), RxwebValidators.numeric()]],
      barcode: [null, [RxwebValidators.numeric()]],
      description: [null, []]
    });
  }

  upload(): void {
  }
}
