import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { UpdateCategoryComponent } from './update-category.component';
import { Category as CategoryMock } from '../../../core/mocks/category.mock';
import { Category } from '../../models/category.model';

describe('UpdateCategoryComponent', () => {
  let component: UpdateCategoryComponent;
  let fixture: ComponentFixture<UpdateCategoryComponent>;
  let category: Category;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UpdateCategoryComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RxReactiveFormsModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCategoryComponent);
    component = fixture.componentInstance;
    category = CategoryMock();
    component.category = category;
    fixture.detectChanges();
  });

  it('should check if UpdateCategory is created.', () => {
    expect(component).toBeTruthy();
  });

  it('should emit update event with category data if update is called.', fakeAsync(() => {
    let updateData = null;
    component.updateEvent.subscribe(data => updateData = data);
    component.update();
    tick();
    expect(updateData).toEqual({ id: category.id, name: category.name });
  }));
});
