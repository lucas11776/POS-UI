import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutListElementComponent } from './checkout-list-element.component';

describe('CheckoutListElementComponent', () => {
  let component: CheckoutListElementComponent;
  let fixture: ComponentFixture<CheckoutListElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutListElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutListElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
