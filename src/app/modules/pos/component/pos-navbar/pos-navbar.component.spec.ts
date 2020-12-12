import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PosNavbarComponent } from './pos-navbar.component';
import { SharedModule } from '../../../../shared/shared.module';
import { EventBusService } from '../../../../core/services/event-bus.service';

describe('PosNavbarComponent', () => {
  let component: PosNavbarComponent;
  let fixture: ComponentFixture<PosNavbarComponent>;
  let eventBusService: EventBusService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PosNavbarComponent
      ],
      imports: [
        RouterTestingModule,
        SharedModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PosNavbarComponent);
    component = fixture.componentInstance;
    eventBusService = TestBed.inject(EventBusService);
    fixture.detectChanges();
  });

  it('should check if pos navbar component is created.', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle sidebar when toggleSidebar is called.', fakeAsync(() => {
    let isToggled = false;
    eventBusService.event.subscribe(_ => isToggled = true);
    component.toggleSidebar();
    tick();
    expect(isToggled).toBeTrue();
  }));
});
