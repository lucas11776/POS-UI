import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { CookieService } from 'ngx-cookie-service';

import { SidebarComponent } from './sidebar.component';
import { SidebarService } from '../../services/sidebar.service'

declare let $: any;

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let cookieService: CookieService;
  let sidebarService: SidebarService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SidebarComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    cookieService = TestBed.inject(CookieService);
    sidebarService = TestBed.inject(SidebarService);
    fixture.detectChanges();
  });

  beforeEach(() => {
    $(document.body).attr('class', '');
  })

  afterEach(() => {
    // clear body margin
    component.ngOnDestroy();
    cookieService.deleteAll();
  });

  it('should create Sidebar component.', () => {
    expect(component).toBeTruthy();
  });

  it('should setup component with window width of 1200 and sidenav state of null.', () => {
    spyOn($.fn, 'width').and.returnValue(1200);
    component.ngAfterViewInit();
    expect(cookieService.get('sidenav-state')).toBe('pinned');
  });

  it('should setup component with window width of 1200 and sidenav state of unpinned.', () => {
    spyOn($.fn, 'width').and.returnValue(1200);
    cookieService.set('sidenav-state', 'unpinned');
    component.ngAfterViewInit();
    expect(cookieService.get('sidenav-state')).toBe('unpinned');
  });

  it('should toggle sidebav to unpinned if sidebar is pinned', () => {
    spyOn($.fn, 'width').and.returnValue(1200);
    cookieService.set('sidenav-state', 'pinned');
    component.sidenavToggle();
    expect(cookieService.get('sidenav-state')).toBe('unpinned');
  });

  it('should toggle sidenav to pinned if sidebar is unpinned', () => {
    spyOn($.fn, 'width').and.returnValue(1200);
    cookieService.set('sidenav-state', 'unpinned');
    component.sidenavToggle();
    expect(cookieService.get('sidenav-state')).toBe('pinned');
  });

  it('should open sidenav on mouseenter event in sidenav.', () => {
    $(component.sidenav.nativeElement).trigger('mouseenter');
    expect($(document.body).hasClass('g-sidenav-show')).toBeTrue();
  });

  it('should close sidebar on mouseleave event in sidenav.', fakeAsync(() => {
    $(component.sidenav.nativeElement).trigger('mouseleave');
    expect($(document.body).hasClass('g-sidenav-hide')).toBeTrue();
    tick(300);
    expect($(document.body).hasClass('g-sidenav-hidden')).toBeTrue();
  }));

  it('should close sidenav if sidenav is pinned and screen size is less then 1200px.', () => {
    spyOn($.fn, 'width').and.returnValue(1024);
    cookieService.set('sidenav-state', 'pinned');
    $(document.body).trigger('click');
    expect(cookieService.get('sidenav-state')).toBe('unpinned');
  });

  it('should remove sidebar margin left (0px) if window resize and window is less then 1200px', () => {
    spyOn($.fn, 'width').and.returnValue(800);
    $(document.body).css('margin-left', 80);
    $(window).trigger('resize');
    expect($(document.body).css('margin-left')).toBe('0px');
  });

  it('should assign sidebar unpinned margin left (62px) if the window resize and the width size is >= 1200px', () => {
    spyOn($.fn, 'width').and.returnValue(1200);
    cookieService.set('sidenav-state', 'unpinned');
    $(document.body).trigger('resize');
    expect($(document.body).css('margin-left')).toBe('62px');
  });

  it('should assign sidebar pinned margin left (250px) if the window resize and the width size is >= 1200px', () => {
    spyOn($.fn, 'width').and.returnValue(1200);
    cookieService.set('sidenav-state', 'pinned');
    $(document.body).trigger('resize');
    expect($(document.body).css('margin-left')).toBe('250px');
  });

  it('should toggle sidebar to pinned is sidebar is unpinned.', fakeAsync(() => {
    cookieService.set('sidenav-state', 'unpinned');
    sidebarService.toggle();
    tick(500);
    expect(cookieService.get('sidenav-state')).toBe('pinned');
  }));
});
