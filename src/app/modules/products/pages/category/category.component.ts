import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { SubSink } from 'subsink';

import { CategoryService } from '../../shared/category.service';
import { Category, CreateCategory, UpdateCategory } from '../../../../shared/models/category.model';
import { Error } from '../../../../shared/models/Error.model';

@Component({
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit, OnDestroy {
  categories$: Observable<Category[]>;
  sub = new SubSink;
  formError: any;

  constructor(
    private _categoryService: CategoryService,
    private _ngxSpinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.categories$ = this._categoryService.categories$;
  }

  create($event: CreateCategory): void   {
    this._ngxSpinnerService.show();
    this.sub.sink = this._categoryService.create($event)
      .subscribe(
        category => this.createSuccess(category),
        error => this.createFailed(error));
  }

  update($event: UpdateCategory): void {
    this._ngxSpinnerService.show();
    this.sub.sink = this._categoryService.update($event)
      .subscribe(
        msg => this.updateSuccess(msg),
        err => this.updateFailed(err));
  }

  delete($event: number): void {
    this._ngxSpinnerService.show();
    this.sub.sink = this._categoryService.delete($event)
      .subscribe(
        msg => this.deleteSuccess(msg),
        err => this.deleteFailed(err));
  }
  
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  protected createSuccess(category: Category): void {
    this._ngxSpinnerService.hide();
  }

  protected createFailed(error: Error): void {
    this._ngxSpinnerService.hide();
  }

  protected updateSuccess(message: any): void {
    this._ngxSpinnerService.hide();
  }

  protected updateFailed(error: Error): void {
    this._ngxSpinnerService.hide();
  }

  protected deleteSuccess(message: { message: string }): void {
    this._ngxSpinnerService.hide();
  }

  protected deleteFailed(error: Error): void {
    this._ngxSpinnerService.hide();
  }
}
