import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Category } from '../../models/category.model';

@Component({
  selector: 'ks-category-badge-group',
  templateUrl: './category-badge-group.component.html',
  styleUrls: ['./category-badge-group.component.css']
})
export class CategoryBadgeGroupComponent {
  @Output('select') selectEvent = new EventEmitter<Category>();
  @Input('categories') categories: Category[];
  @Input('selected') selected: Category;

  select(category: Category): void {
    this.selectEvent.emit(category);
    this.selected = category;
  }
}
