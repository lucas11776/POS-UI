import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { CategoriesListComponent } from './categories-list.component';
import { SharedModule } from '../../shared.module';
import { Category } from '../../models/category.model';
import { Category as CategoryMock } from '../../../core/mocks/category.mock';

describe('CategoriesListComponent', () => {
  let component: CategoriesListComponent;
  let fixture: ComponentFixture<CategoriesListComponent>;
  let category: Category;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CategoriesListComponent
      ],
      imports: [
        SharedModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesListComponent);
    component = fixture.componentInstance;
    category = CategoryMock();
    component.catagory = category;
    fixture.detectChanges();
  });

  it('should check if CategoryList component is created.', () => {
    expect(component).toBeTruthy();
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
    component.delete(category.id);
    expect(categoryId).toBe(category.id);
  }));
});
