import { Component, Input, OnInit } from '@angular/core';

import { Product } from '../../../../shared/models/product.model';

@Component({
  selector: 'ks-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input('product') product: Product;
  
  constructor() { }

  ngOnInit(): void {
  }

}
