import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'ks-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  form: FormGroup;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      image: [null, []],
      images: [null, []],
      name: [null, []],
      price: [null, []],
      discount: [null, []],
      category_id: [null, []],
      in_stock: [null, []],
      barcode: [null, []],
      description: [null, []]
    });
  }

  upload(): void {
  }
}
