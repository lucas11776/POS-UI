import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';

import { NavbarComponent } from './navbar.component';
import { EventBusService } from '../../../core/services/event-bus.service';
import { UserService } from '../../../modules/user/shared/user.service';
import { Profile as ProfileMock } from '../../../core/mocks/user.mock';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let eventBusService: EventBusService;
  let ngbMadal: NgbModal;
  let userService: UserService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NavbarComponent
      ],
      imports: [
        NgbModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    eventBusService = TestBed.inject(EventBusService);
    ngbMadal = TestBed.inject(NgbModal);
    userService = TestBed.inject(UserService);
    fixture.detectChanges();
  });

  it('should toggle sidebar when toggleSidebar is called.', fakeAsync(() => {
    let isToggled = false;
    eventBusService.event.subscribe(_ => isToggled = true);
    component.toggleSidebar();
    tick(500);
    expect(isToggled).toBeTrue();
  }));

  it('should open logout modal when logout is called.', () => {
    spyOn(ngbMadal, 'open').and.returnValue(null);
    component.logout();
    expect(ngbMadal.open).toHaveBeenCalled();
  });

  it('should get user profile from profile$ property.', fakeAsync(() => {
    const profile = ProfileMock()
    spyOn(userService, 'fetchProfile').and.returnValue(of(profile));
    component.profile$
      .subscribe(p => expect(p).toBe(profile));
    tick();
    fixture.detectChanges();
  }));
});
