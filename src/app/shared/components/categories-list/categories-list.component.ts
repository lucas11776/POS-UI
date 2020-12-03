import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';

import { Category, UpdateCategory } from '../../models/category.model';

@Component({
  selector: 'ks-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {
  @Output('update') updateEvent = new EventEmitter<UpdateCategory>();
  @Output('delete') deleteEvent = new EventEmitter<number>();
  @Input('category') catagory: Category;

  constructor() { }

  ngOnInit(): void {
  }

  update($event): void {
    this.updateEvent.emit($event);
  }

  delete($event: number) {
    this.deleteEvent.emit($event);
  }
}
