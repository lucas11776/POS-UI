import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { CategoryBadgeGroupComponent } from './category-badge-group.component';
import { Category } from '../../models/category.model';
import { Category as CategoryMock } from '../../../core/mocks/category.mock';

describe('CategoryBadgeGroupComponent', () => {
  let component: CategoryBadgeGroupComponent;
  let fixture: ComponentFixture<CategoryBadgeGroupComponent>;
  let category: Category;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryBadgeGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryBadgeGroupComponent);
    component = fixture.componentInstance;
    category = CategoryMock();
    fixture.detectChanges();
  });

  it('should check if CategoryBadgeGroup is created.', () => {
    expect(component).toBeTruthy();
  });

  it('should emit selected category if select is called.', fakeAsync(() => {
    let categorySelected = null;
    component.selectEvent.subscribe(c => categorySelected = c);
    component.select(category);
    tick();
    expect(categorySelected).toEqual(category);
  }));

  it('should assign selected category to selected property if select is called.', () => {
    component.select(category);
    expect(component.selected).toEqual(category);
  });
});
