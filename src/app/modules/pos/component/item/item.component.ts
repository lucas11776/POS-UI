import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Product } from '../../../../shared/models/product.model';

@Component({
  selector: 'ks-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Output('add') addEvent = new EventEmitter<any>();
  @Input('item') item: Product;
  @Input('type') type: string;

  constructor() { }

  ngOnInit(): void {
  }
}
