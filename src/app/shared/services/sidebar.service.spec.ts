import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { SidebarService } from './sidebar.service';

describe('SidebarService', () => {
  let service: SidebarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SidebarService);
  });

  it('should create Sidebar service.', () => {
    expect(service).toBeTruthy();
  });

  it('should emit a toggle event is toggle is called.', fakeAsync(() => {
    let isToggled = false;
    service.togglerObservable.subscribe(_=> isToggled = true);
    service.toggle();
    tick(500);
    expect(isToggled).toBeTrue();
  }));
});
