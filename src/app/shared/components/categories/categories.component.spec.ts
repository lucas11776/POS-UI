import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { CategoriesComponent } from './categories.component';
import { SharedModule } from '../../shared.module';
import { Category } from '../../models/category.model';
import { Category as CategoryMock } from '../../../core/mocks/category.mock';

describe('CategoriesComponent', () => {
  let component: CategoriesComponent;
  let fixture: ComponentFixture<CategoriesComponent>;
  let category: Category;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CategoriesComponent
      ],
      imports: [
        SharedModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesComponent);
    component = fixture.componentInstance;
    category = CategoryMock();
    fixture.detectChanges();
  });

  it('should check if Categories component is created.', () => {
    expect(component).toBeTruthy();
  });

  it('should create new category.', () => {
    let category = { name: 'Computers & Laptops' };
    let categoryCreate = null;
    component.createEvent.subscribe(c => categoryCreate = c);
    component.create(category);
    expect(categoryCreate).toEqual(category);
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
