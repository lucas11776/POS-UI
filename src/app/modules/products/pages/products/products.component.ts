import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SubSink } from 'subsink';

import { ProductsPagination } from '../../../../shared/models/product.model';
import { ProductService } from '../../shared/product.service';
import { Error } from '../../../../shared/models/api.model';

@Component({
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: ProductsPagination;
  sub = new SubSink;
  error: Error;

  constructor(
    private _productService: ProductService,
    private _ngxSpinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  pagination(event$: number) {
    this.getProducts();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  protected getProducts(): void {
    this.error = null;
    this._ngxSpinnerService.show();
    this.sub.sink = this._productService.get()
      .subscribe(
        products => this.productsSuccess(products),
        error => this.productsFailed(error));
  }

  protected productsSuccess(products: ProductsPagination): void {
    this.products = products;
    this._ngxSpinnerService.hide();
    window.scroll(0,0);
  }

  protected productsFailed(error: Error): void {
    this.error = error;
    this._ngxSpinnerService.hide();
  }
}
