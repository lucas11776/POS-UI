import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import faker from 'faker';

import { EditDescriptionComponent } from './edit-description.component';
import { Errors } from 'src/app/shared/errors/form.error';

describe('EditDescriptionComponent', () => {
  let component: EditDescriptionComponent;
  let fixture: ComponentFixture<EditDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EditDescriptionComponent
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
    fixture = TestBed.createComponent(EditDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should check if EditDescription component is created.', () => {
    expect(component).toBeTruthy();
  });

  it('should check if description is required field.', () => {
    component.form.setValue({ description: '' });
    component.form.controls.description.markAsDirty();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain(Errors.description.required);
  });

  it('should check if description has max words of 1500.', () => {
    component.form.setValue({ description: faker.random.words(2000) });
    component.form.controls.description.markAsDirty();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain(Errors.description.max);
  });

  it('should emit description if update is called.', fakeAsync(() => {
    const description = faker.random.words(50);
    component.form.setValue({ description: description });
    component.updateEvent
      .subscribe(d => expect(d.description).toEqual(description));
    component.update();
    tick();
  }));
});