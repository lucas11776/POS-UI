import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutButtonsComponent } from './checkout-buttons.component';

describe('CheckoutButtonsComponent', () => {
  let component: CheckoutButtonsComponent;
  let fixture: ComponentFixture<CheckoutButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
