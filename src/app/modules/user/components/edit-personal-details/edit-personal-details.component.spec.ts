import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPersonalDetailsComponent } from './edit-personal-details.component';

describe('EditPersonalDetailsComponent', () => {
  let component: EditPersonalDetailsComponent;
  let fixture: ComponentFixture<EditPersonalDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPersonalDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPersonalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should check if EditPersonalDetails component is created.', () => {
    expect(component).toBeTruthy();
  });
});
