import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PosSidebarComponent } from './pos-sidebar.component';
import { SharedModule } from '../../shared.module';

describe('PosSidebarComponent', () => {
  let component: PosSidebarComponent;
  let fixture: ComponentFixture<PosSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PosSidebarComponent
      ],
      imports: [
        SharedModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PosSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should check if PosSidebar is created.', () => {
    expect(component).toBeTruthy();
  });
});
