import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { UploadProfilePictureComponent } from './upload-profile-picture.component';
import { _File } from '../../../../core/mocks/file.mock';

describe('UploadProfilePictureComponent', () => {
  let component: UploadProfilePictureComponent;
  let fixture: ComponentFixture<UploadProfilePictureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UploadProfilePictureComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RxReactiveFormsModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadProfilePictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should check if UploadProfilePicture component is created.', () => {
    expect(component).toBeTruthy();
  });

  it('should open select file window when open is called.', () => {
    spyOn(component.input.nativeElement, 'click').and.returnValue(null);
    component.open();
    expect(component.input.nativeElement.click).toHaveBeenCalled();
  });

  it('should upload file is selected image is valid.', fakeAsync(() => {
    const image = _File('image.png', 'image/png', 12353)
    component.uploadEvent
      .subscribe(form => expect(form).toEqual({ image: image }))
    component.form.setValue({ image: image });
    tick();
  }));
});
