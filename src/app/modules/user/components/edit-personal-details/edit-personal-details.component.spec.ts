import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import faker from 'faker';

import { EditPersonalDetailsComponent } from './edit-personal-details.component';
import { Errors } from '../../../../shared/errors/form.error';
import { PersonalDetails as PersonalDetailsMock } from '../../../../core/mocks/user.mock';
import { PersonalDetails } from '../../../../shared/models/user.model';

describe('EditPersonalDetailsComponent', () => {
  let component: EditPersonalDetailsComponent;
  let fixture: ComponentFixture<EditPersonalDetailsComponent>;
  let personalDetails: PersonalDetails;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EditPersonalDetailsComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RxReactiveFormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPersonalDetailsComponent);
    component = fixture.componentInstance;
    personalDetails = PersonalDetailsMock();
    fixture.detectChanges();
  });

  it('should check if EditPersonalDetails component is created.', () => {
    expect(component).toBeTruthy();
  });

  it('should check if name is required field.', () => {
    personalDetails.first_name = '';
    component.form.setValue(personalDetails);
    component.form.controls.first_name.markAsDirty();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain(Errors.first_name.required);
  });

  it('should check if name field accept minimum of 3 charactors.', () => {
    personalDetails.first_name = 'Jo';
    component.form.setValue(personalDetails);
    component.form.controls.first_name.markAsDirty();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain(Errors.first_name.min);
  });

  it('should check if name field accept maximum of 50 charactors.', () => {
    personalDetails.first_name = faker.random.words(51);
    component.form.setValue(personalDetails);
    component.form.controls.first_name.markAsDirty();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain(Errors.first_name.max);
  });

  it('should check if surname is required field.', () => {
    personalDetails.last_name = '';
    component.form.setValue(personalDetails);
    component.form.controls.last_name.markAsDirty();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain(Errors.last_name.required);
  });

  it('should check if surname field accept minimum of 3 charactors.', () => {
    personalDetails.last_name = 'Ba';
    component.form.setValue(personalDetails);
    component.form.controls.last_name.markAsDirty();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain(Errors.last_name.min);
  });

  it('should check if surname field accept maximum of 50 charactors.', () => {
    personalDetails.last_name = faker.random.words(51);
    component.form.setValue(personalDetails);
    component.form.controls.last_name.markAsDirty();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain(Errors.last_name.max);
  });

  it('should emit form values if update is called.', fakeAsync(() => {
    component.form.setValue(personalDetails);
    component.updateEvent
      .subscribe(details => expect(details).toEqual(personalDetails));
    component.update();
    tick();
  }));
});
