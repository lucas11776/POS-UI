import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { UploadProfilePictureComponent } from './upload-profile-picture.component';
import { _File as FileMock } from '../../../../core/mocks/file.mock';
import { Errors } from 'src/app/shared/errors/form.error';

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

  it('should check if image is required field.', () => {
    component.form.controls.image.markAsDirty();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain(Errors.image.required);
  });

  it('should check if image is a valid image file.', () => {
    const image = FileMock('image.gif', 'image/gif');
    component.form.setValue({ image: image });
    component.form.controls.image.markAsDirty();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain(Errors.image.invalid);
  });

  it('should check if image field does not exceed maximum file size.', () => {
    const image = FileMock('image.gif', 'image/gif', (1024 * 1024) * 4);
    component.form.setValue({ image: image });
    component.form.controls.image.markAsDirty();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain(Errors.image.max);
  });

  it('should upload file is selected image is valid.', fakeAsync(() => {
    const image = FileMock('image.png', 'image/png', 12353)
    component.uploadEvent
      .subscribe(form => expect(form).toEqual({ image: image }))
    component.form.setValue({ image: image });
    tick();
  }));
});
