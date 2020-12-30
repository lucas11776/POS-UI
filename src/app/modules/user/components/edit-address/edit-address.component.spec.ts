import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAddressComponent } from './edit-address.component';

describe('EditAddressComponent', () => {
  let component: EditAddressComponent;
  let fixture: ComponentFixture<EditAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should check if EditAddress component is created.', () => {
    expect(component).toBeTruthy();
  });
});
