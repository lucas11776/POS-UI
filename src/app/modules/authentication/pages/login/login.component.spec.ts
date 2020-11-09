import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';
import { Login } from '../../../../shared/models/authentication.model';
import { Login as LoginMock } from '../../../../core/mocks/authentication.mock';
import { Errors } from '../../../../shared/errors/form.error';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginMock: Login;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginComponent
      ],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    loginMock = LoginMock();
    fixture.detectChanges();
  });

  it('should create RegisterComponent.', () => {
    expect(component).toBeTruthy();
  });

  it('should check if username is required field.', () => {
    loginMock.username = '';
    component.form.setValue(loginMock);
    component.form.controls.username.markAsDirty();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain(Errors.username.required);
  });

  it('should check if password is required field.', () => {
    loginMock.password = '';
    component.form.setValue(loginMock);
    component.form.controls.password.markAsDirty();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain(Errors.password.required);
  });
});
