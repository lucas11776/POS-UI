import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { CookieService } from 'ngx-cookie-service';
import { JwtModule } from '@auth0/angular-jwt';
import { of, throwError } from 'rxjs';

import { LoginComponent } from './login.component';
import { Login } from '../../../../shared/models/authentication.model';
import { Login as LoginMock, Token } from '../../../../core/mocks/authentication.mock';
import { Errors } from '../../../../shared/errors/form.error';
import { AuthenticationService } from '../../../../core/authentication/authentication.service';
import { JwtOptionsProvider } from '../../../../core/providers/jwtOptions.provider';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginMock: Login;
  let authenticationService: AuthenticationService;
  let cookieService: CookieService;
  let ngxSpinnerService: NgxSpinnerService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginComponent
      ],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        NgxSpinnerModule,
        HttpClientTestingModule,
        JwtModule.forRoot({ jwtOptionsProvider: JwtOptionsProvider }),
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    loginMock = LoginMock();
    authenticationService = TestBed.inject(AuthenticationService);
    cookieService = TestBed.inject(CookieService);
    ngxSpinnerService = TestBed.inject(NgxSpinnerService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  beforeEach(() => {
    spyOn(ngxSpinnerService, 'show').and.returnValue();
    spyOn(ngxSpinnerService, 'hide').and.returnValue();
    spyOn(router, 'navigate').and.returnValue(new Promise<boolean>((rs,rj) => rs(true)));
  });

  afterEach(() => {
    cookieService.deleteAll();
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

  it('should clear error when making login request.', () => {
    component.error = { message: 'Something went wrong please try again.' };
    component.login();
    expect(component.error).toBeNull();
  });

  it('should display spinner when making login request.', () => {
    component.login();
    expect(ngxSpinnerService.show).toHaveBeenCalled();
  });

  it('should login user and store user token in cookies.', fakeAsync(() => {
    spyOn(authenticationService, 'login').and.returnValue(of(Token()));
    component.login();
    tick();
    expect(document.cookie).toContain(Token().token);
  }));

  it('should hide spinner when login request is complete.', fakeAsync(() => {
    spyOn(authenticationService, 'login').and.returnValue(of(Token()));
    component.login();
    tick();
    expect(ngxSpinnerService.hide).toHaveBeenCalled();
  }));

  it('should redirect user after user is login.', fakeAsync(() => {
    spyOn(authenticationService, 'login').and.returnValue(of(Token()));
    component.login();
    tick();
    expect(router.navigate).toHaveBeenCalled();
  }));

  it('should assing error in error componet if login request failed.', fakeAsync(() => {
    let error = { message: 'Failed to login account already in use.' };
    spyOn(authenticationService, 'login').and.returnValue(throwError(error));
    component.login();
    tick();
    expect(component.error).toEqual(error);
  }));

  it('should hide spinner if login request failed.', fakeAsync(() => {
    spyOn(authenticationService, 'login').and.returnValue(throwError({}));
    component.login();
    tick();
    expect(ngxSpinnerService.hide).toHaveBeenCalled();
  }));
});
