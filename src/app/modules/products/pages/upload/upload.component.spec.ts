import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { UploadComponent } from './upload.component';
import { SharedModule } from '../../../../shared/shared.module';

describe('UploadComponent', () => {
  let component: UploadComponent;
  let fixture: ComponentFixture<UploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UploadComponent
      ],
      imports: [
        SharedModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        RxReactiveFormsModule,
        HttpClientTestingModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create Upload component.', () => {
    expect(component).toBeTruthy();
  });

  it('should check if image is required field.', () => {
    
  });
});
