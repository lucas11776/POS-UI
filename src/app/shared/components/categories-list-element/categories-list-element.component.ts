import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { Category, UpdateCategory } from '../../models/category.model';

@Component({
  selector: 'ks-categories-list-element',
  templateUrl: './categories-list-element.component.html',
  styleUrls: ['./categories-list-element.component.css']
})
export class CategoriesListElementComponent {
  @Output('update') updateEvent = new EventEmitter<UpdateCategory>();
  @Output('delete') deleteEvent = new EventEmitter<number>();
  @Input('category') category: Category;
  edit: boolean = false;

  toggleEdit(): void {
    this.edit = !this.edit;
  }

  update($event: UpdateCategory): void {
    this.updateEvent.emit($event);
  }

  delete(): void {
    this.deleteEvent.emit(this.category.id);
  }
}
