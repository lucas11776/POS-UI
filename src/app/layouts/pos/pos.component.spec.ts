import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PosComponent } from './pos.component';

describe('PosComponent', () => {
  let component: PosComponent;
  let fixture: ComponentFixture<PosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PosComponent,
      ],
      imports: [
        RouterTestingModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should check if Pos component is created.', () => {
    expect(component).toBeTruthy();
  });
});
