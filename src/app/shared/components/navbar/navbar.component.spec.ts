import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { NavbarComponent } from './navbar.component';
import { SidebarService } from '../../services/sidebar.service';
import { EventBusService } from '../../../core/services/event-bus.service';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let eventBusService: EventBusService;
  let ngbMadal: NgbModal;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NavbarComponent
      ],
      imports: [
        NgbModule,
        HttpClientTestingModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    eventBusService = TestBed.inject(EventBusService);
    ngbMadal = TestBed.inject(NgbModal);
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
});
