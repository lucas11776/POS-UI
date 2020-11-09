import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import faker from 'faker';

import { RegisterComponent } from './register.component';
import { Register } from '../../../../shared/models/authentication.model';
import { Errors } from '../../../../shared/errors/form.error';
import { Register as RegisterMock } from 'src/app/core/mocks/authentication.mock';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let registerMock: Register;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RegisterComponent
      ],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    registerMock = RegisterMock();
    fixture.detectChanges();
  });

  it('should create RegisterComponent.', () => {
    expect(component).toBeTruthy();
  });

  it('should check if name is required field.', () => {
    registerMock.first_name = '';
    component.form.setValue(registerMock);
    component.form.controls.first_name.markAsDirty();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain(Errors.first_name.required);
  });

  it('should check if name field accept minimum of 3 charactors.', () => {
    registerMock.first_name = 'Jo';
    component.form.setValue(registerMock);
    component.form.controls.first_name.markAsDirty();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain(Errors.first_name.min);
  });

  it('should check if name field accept maximum of 50 charactors.', () => {
    registerMock.first_name = faker.random.words(51);
    component.form.setValue(registerMock);
    component.form.controls.first_name.markAsDirty();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain(Errors.first_name.max);
  });

  it('should check if surname is required field.', () => {
    registerMock.last_name = '';
    component.form.setValue(registerMock);
    component.form.controls.last_name.markAsDirty();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain(Errors.last_name.required);
  });

  it('should check if surname field accept minimum of 3 charactors.', () => {
    registerMock.last_name = 'Ba';
    component.form.setValue(registerMock);
    component.form.controls.last_name.markAsDirty();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain(Errors.last_name.min);
  });

  it('should check if surname field accept maximum of 50 charactors.', () => {
    registerMock.last_name = faker.random.words(51);
    component.form.setValue(registerMock);
    component.form.controls.last_name.markAsDirty();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain(Errors.last_name.max);
  });

  it('should check if email is required field if cellphone number is empty.', () => {
    registerMock.cellphone_number = '';
    registerMock.email = '';
    component.form.setValue(registerMock);
    component.form.controls.email.markAsDirty();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain(Errors.email.required_empty_cellphone);
  });

  it('should check if invalid email is not accepted.', () => {
    registerMock.email = 'joe#gmail.com';
    component.form.setValue(registerMock);
    component.form.controls.email.markAsDirty();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain(Errors.email.email);
  });

  it('should check if cellphone number is required field if email is empty.', () => {
    registerMock.email = '';
    registerMock.cellphone_number = '';
    component.form.setValue(registerMock);
    component.form.controls.cellphone_number.markAsDirty();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain(Errors.cellphone_number.required_empty_email);
  });

  it('should check if invalid cellphone number is not accepted.', () => {
    registerMock.cellphone_number = '0728517188';
    component.form.setValue(registerMock);
    component.form.controls.cellphone_number.markAsDirty();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain(Errors.cellphone_number.invalid);
  });

  it('should check if password is required field.', () => {
    registerMock.password = '';
    component.form.setValue(registerMock);
    component.form.controls.password.markAsDirty();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain(Errors.password.required);
  });

  it('should check if password field accept minimum of 8 charactors.', () => {
    registerMock.password = 'Test@12';
    component.form.setValue(registerMock);
    component.form.controls.password.markAsDirty();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain(Errors.password.min);
  });

  it('should check if password field accept maximum of 20 charactors.', () => {
    registerMock.password = faker.random.words(21);
    component.form.setValue(registerMock);
    component.form.controls.password.markAsDirty();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain(Errors.password.max);
  });

  it('should check if password field accept password with one uppercase letter and lowercase letter with digit and special charactor.', () => {
    registerMock.password = 'test@123';
    component.form.setValue(registerMock);
    component.form.controls.password.markAsDirty();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain(Errors.password.invalid);
  });

  it('should check if password confirmation is required field.', () => {
    registerMock.password_confirmation = '';
    component.form.setValue(registerMock);
    component.form.controls.password_confirmation.markAsDirty();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain(Errors.password_confirmation.required);
  });

  it('should check if password confirmation most match password.', () => {
    registerMock.password_confirmation = 'test@123';
    component.form.setValue(registerMock);
    component.form.controls.password_confirmation.markAsDirty();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain(Errors.password_confirmation.match);
  });
});
