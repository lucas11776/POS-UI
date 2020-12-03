import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Category, CreateCategory, UpdateCategory } from '../../models/category.model';

@Component({
  selector: 'ks-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  @Output('create') createEvent = new EventEmitter<CreateCategory>();
  @Output('update') updateEvent = new EventEmitter<UpdateCategory>();
  @Output('delete') deleteEvent = new EventEmitter<number>();
  @Input('categories') categories: Category[];

  create($event: CreateCategory): void {
    this.createEvent.emit($event);
  }

  update($event: UpdateCategory): void {
    this.updateEvent.emit($event);
  }

  delete($event: number): void {
    this.deleteEvent.emit($event);
  }
}
