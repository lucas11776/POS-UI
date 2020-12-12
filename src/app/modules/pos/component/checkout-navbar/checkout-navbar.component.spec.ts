import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';

import { CheckoutNavbarComponent } from './checkout-navbar.component';
import { EventBusService } from '../../../../core/services/event-bus.service';

describe('CheckoutNavbarComponent', () => {
  let component: CheckoutNavbarComponent;
  let fixture: ComponentFixture<CheckoutNavbarComponent>;
  let eventBusService: EventBusService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutNavbarComponent);
    component = fixture.componentInstance;
    eventBusService = TestBed.inject(EventBusService);
    fixture.detectChanges();
  });

  it('should check if CheckOutNavbar is created.', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle sidebar when toggleSidebar is called.', fakeAsync(() => {
    let isToggled = false;
    eventBusService.event.subscribe(_ => isToggled = true);
    component.toggleSidebar();
    expect(isToggled).toBeTrue();
  }));
});
