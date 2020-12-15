import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { SubSink } from 'subsink';

import { ServicesService } from '../../shared/services.service';
import { CategoriesService } from '../../shared/categories.service';
import { Service } from '../../../../shared/models/service.model';
import { words } from '../../../../core/validators/form-validators';
import { Category } from '../../../../shared/models/category.model';
import { Errors } from '../../../../shared/errors/form.error';

@Component({
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit, OnDestroy {
  error;
  form: FormGroup;
  formErrors = Errors;
  sub = new SubSink();

  constructor(
    private _formBuilder: FormBuilder,
    private _ngxSpinnerService: NgxSpinnerService,
    private _categoriesService: CategoriesService,
    private _servicesServices: ServicesService,
    private _router: Router) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      image: [null, [RxwebValidators.required(), RxwebValidators.fileSize({ maxSize: (1024)*3 })]],
      images: [null, [RxwebValidators.fileSize({ maxSize: (1024*1024)*3 }), RxwebValidators.file({ maxFiles: 5 })]],
      name: [null, [RxwebValidators.required(), RxwebValidators.minLength({ value: 5 }), RxwebValidators.maxLength({ value: 50 })]],
      price: [null, [RxwebValidators.required(), RxwebValidators.numeric()]],
      discount: [null, [RxwebValidators.numeric()]],
      category_id: ['', []],
      in_stock: [null, [RxwebValidators.required(), RxwebValidators.numeric()]],
      description: [null, [RxwebValidators.required(), words({ maxWords: 1500 })]]
    });
  }

  get categories(): Observable<Category[]> {
    return this._categoriesService.categories$;
  }

  upload(): void {
    this.error = null;
    this._ngxSpinnerService.show();
    this.sub.sink = this._servicesServices.create(this.form.value)
      .subscribe(
        service => this.uploaded(service),
        error => this.uploadFalied(error));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  protected uploaded(service: Service): void {
    this._ngxSpinnerService.hide();
    this._router.navigate(['services', service.id]);
  }

  protected uploadFalied(error: Error): void {
    this.error = error;
    this._ngxSpinnerService.hide();
  }
}
