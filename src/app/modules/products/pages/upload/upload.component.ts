import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';

import { Errors } from '../../../../shared/errors/form.error';
import { words } from '../../../../core/validators/form-validators';
import { Product } from '../../../../shared/models/product.model';
import { ProductsService } from '../../../../core/services/products.service';

import { CreateProduct } from '../../../../core/mocks/product.mock';

@Component({
  selector: 'ks-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit, OnDestroy {
  form: FormGroup;
  formErrors = Errors;
  uploadSubscription: Subscription;
  errors;

  constructor(
    private _formBuilder: FormBuilder,
    private _ngxSpinnerService: NgxSpinnerService,
    private _productsService: ProductsService,
    private _router: Router) { }

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
      description: [null, [RxwebValidators.required(), words({ maxWords: 1500 })]]
    });
    this.form.setValue(CreateProduct());
  }

  upload(): void {
    this.errors = null;
    this._ngxSpinnerService.show();
    this.uploadSubscription = this._productsService.create(this.form.value)
      .subscribe(product => this.uploaded(product), error => this.uploadFalied(error));
  }

  ngOnDestroy() {
    /* istanbul ignore else */
    if(this.uploadSubscription) this.uploadSubscription.unsubscribe();
  }

  protected uploaded(product: Product): void {
    this._ngxSpinnerService.hide();
    this._router.navigate(['products', product.id]);
  }

  protected uploadFalied(error: Error): void {
    this.errors = error;
    this._ngxSpinnerService.hide();
  }
}
