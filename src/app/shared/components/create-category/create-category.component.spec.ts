import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { CreateCategoryComponent } from './create-category.component';

describe('CreateCategoryComponent', () => {
  let component: CreateCategoryComponent;
  let fixture: ComponentFixture<CreateCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CreateCategoryComponent
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
    fixture = TestBed.createComponent(CreateCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should check if CreateCategory component is created.', () => {
    expect(component).toBeTruthy();
  });

  it('should emit create event when create is called.', fakeAsync(() => {
    const category = { name: 'Computers & Laptops' };
    let createData = null;
    component.form.setValue(category);
    component.createEvent.subscribe(data => createData = data);
    component.create();
    tick();
    expect(createData).toEqual(category);
  }));
});
