import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertComponent } from './alert.component';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should check if Alert component is created.', () => {
    expect(component).toBeTruthy();
  });

  it('should check if message is display in view.', () => {
    let message = 'Something went wrong...'
    component.message = message;
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain(message);
  });

  it('should check if errors are display in view.', () => {
    let errors = {
      email: 'The email is required.',
      password: 'The password is required.'
    };
    component.errors = errors;
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain(errors.email);
    expect(fixture.nativeElement.textContent).toContain(errors.password);
  });
});
