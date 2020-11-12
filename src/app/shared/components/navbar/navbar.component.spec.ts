import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { SidebarService } from '../../services/sidebar.service';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let sidebarService: SidebarService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    sidebarService = TestBed.inject(SidebarService);
    fixture.detectChanges();
  });

  it('should create Navbar component.', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle sidebar when toggleSidebar is called.', fakeAsync(() => {
    let isToggled = false;
    sidebarService.togglerObservable.subscribe(_ => isToggled = true);
    component.toggleSidebar();
    tick(500);
    expect(isToggled).toBeTrue();
  }));
});
