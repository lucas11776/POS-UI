import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutListComponent } from './checkout-list.component';
import { PosModule } from '../../pos.module';

describe('CheckoutListComponent', () => {
  let component: CheckoutListComponent;
  let fixture: ComponentFixture<CheckoutListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CheckoutListComponent
      ],
      imports: [
        PosModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should check if CheckoutList component is created.', () => {
    expect(component).toBeTruthy();
  });
});
