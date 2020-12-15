import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesFormControlComponent } from './images-form-control.component';

describe('ImagesFormControlComponent', () => {
  let component: ImagesFormControlComponent;
  let fixture: ComponentFixture<ImagesFormControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagesFormControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagesFormControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
