import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { CategoriesListElementComponent } from './categories-list-element.component';
import { Category as CategoryMock } from '../../../core/mocks/category.mock';
import { Category } from '../../models/category.model';
import { SharedModule } from '../../shared.module';

describe('CategoriesListElementComponent', () => {
  let component: CategoriesListElementComponent;
  let fixture: ComponentFixture<CategoriesListElementComponent>;
  let category: Category;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CategoriesListElementComponent
      ],
      imports: [
        SharedModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesListElementComponent);
    component = fixture.componentInstance;
    category = CategoryMock();
    component.category = category;
    fixture.detectChanges();
  });

  it('should check if CategoryListElement is created.', () => {
    expect(component).toBeTruthy();
  });

  it('should check if edit is false by default.', () => {
    expect(component.edit).toBeFalse();
  });

  it('should change edit status from false to true when toggled.', () => {
    component.toggleEdit();
    expect(component.edit).toBeTrue();
  });

  it('should update category.', fakeAsync(() => {
    let updateEvent = { id: category.id, name: category.name };
    let categoryUpdate = null;
    component.updateEvent.subscribe(data => categoryUpdate = data);
    component.update(updateEvent);
    tick();
    expect(categoryUpdate).toEqual(updateEvent);
  }));

  it('should delete category', fakeAsync(() => {
    let categoryId = null;
    component.deleteEvent.subscribe(id => categoryId = id);
    component.delete();
    expect(categoryId).toBe(category.id);
  }));
});
