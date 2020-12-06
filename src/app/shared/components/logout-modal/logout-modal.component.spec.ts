import { async, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from  '@angular/router';
import { NgbModule, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { CookieService } from 'ngx-cookie-service';
import { JwtModule } from '@auth0/angular-jwt';
import { of, throwError } from 'rxjs';

import { LogoutModalComponent } from './logout-modal.component';
import { TokenService } from '../../../core/authentication/token.service';
import { AuthenticationService } from '../../../core/authentication/authentication.service';
import { Token } from '../../../core/mocks/authentication.mock';
import { JwtOptionsProvider } from '../../../core/providers/jwtOptions.provider';

describe('LogoutModalComponent', () => {
  let component: LogoutModalComponent;
  let modalRef: NgbModalRef;
  let ngbModal: NgbModal;
  let ngxSpinnerService: NgxSpinnerService;
  let cookieService: CookieService;
  let tokenService: TokenService;
  let authenticationService: AuthenticationService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LogoutModalComponent
      ],
      imports: [
        NgbModule,
        JwtModule.forRoot({ jwtOptionsProvider: JwtOptionsProvider }),
        HttpClientTestingModule,
        NgxSpinnerModule,
        RouterTestingModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    ngbModal = TestBed.inject(NgbModal);
    modalRef = ngbModal.open(LogoutModalComponent);
    component = modalRef.componentInstance;
    ngxSpinnerService = TestBed.inject(NgxSpinnerService);
    cookieService = TestBed.inject(CookieService);
    tokenService = TestBed.inject(TokenService);
    authenticationService = TestBed.inject(AuthenticationService);
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    spyOn(component._ngbActiveModal,'close').and.returnValue();
    spyOn(ngxSpinnerService, 'show').and.returnValue(null);
    spyOn(ngxSpinnerService, 'hide').and.returnValue(null);
    spyOn(router, 'navigate').and.returnValue(new Promise(rs => rs.call(true)));
  });

  afterEach(() => {
    cookieService.deleteAll();
  });

  it('should check if LogoutModal component has been created.', () => {
    expect(component).toBeTruthy();
    component.ngOnDestroy();
  });
  
  it('should clear error when logout is called.', () => {
    component.error = { message: 'Something went wrong...' };
    component.logout();
    expect(component.error).toBeNull();
  });

  it('should display spinner when logout is called.', () => {
    component.logout();
    expect(ngxSpinnerService.show).toHaveBeenCalled();
  });

  it('should delete token from cookie when logout request is completed.', fakeAsync(() => {
    spyOn(authenticationService, 'logout').and.returnValue(of({ message: 'You are logged out...' }));
    tokenService.store(Token());
    component.logout();
    tick();
    expect(tokenService.get()).toBe('');
  }));

  it('should hide spinner when logout request is completed.', fakeAsync(() => {
    spyOn(authenticationService, 'logout').and.returnValue(of({ message: 'You are logged out...' }));
    component.logout();
    tick();
    expect(ngxSpinnerService.hide).toHaveBeenCalled();
  }));

  it('should close modal when logout requst is complete.', fakeAsync(() => {
    spyOn(authenticationService, 'logout').and.returnValue(of({ message: 'You are logged out...' }));
    component.logout();
    tick();
    expect(component._ngbActiveModal.close).toHaveBeenCalled();
  }));

  it('should redirect user after logout request was successfully.', fakeAsync(() => {
    spyOn(authenticationService, 'logout').and.returnValue(of({ message: 'You are logged out...' }));
    component.logout();
    tick();
    expect(router.navigate).toHaveBeenCalled();
  }));

  it('should set error when logout failed.', fakeAsync(() => {
    const error = { message: 'Something went wrong...' };
    spyOn(authenticationService, 'logout').and.returnValue(throwError(error));
    component.logout();
    tick();
    expect(component.error).toEqual(error);
  }));

  it('should hide spinner when logout request failed.', fakeAsync(() => {
    spyOn(authenticationService, 'logout').and.returnValue(throwError({ message: 'Something went wrong...' }));
    component.logout();
    tick();
    expect(ngxSpinnerService.hide).toHaveBeenCalled();
  }));

  it('should close modal when close is called.', () => {
    component.close();
    expect(component._ngbActiveModal.close).toHaveBeenCalled()
  });
});
