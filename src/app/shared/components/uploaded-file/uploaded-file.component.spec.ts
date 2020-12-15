import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { UploadedFileComponent } from './uploaded-file.component';
import { SharedModule } from '../../shared.module';
import { _File as FileMock } from '../../../core/mocks/file.mock';

describe('UploadedFileComponent', () => {
  let component: UploadedFileComponent;
  let fixture: ComponentFixture<UploadedFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UploadedFileComponent
      ],
      imports: [
        SharedModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadedFileComponent);
    component = fixture.componentInstance;
    component.file = FileMock();
    fixture.detectChanges();
  });

  it('should check if UploadedFile component is created.', () => {
    expect(component).toBeTruthy();
  });

  it('should check if isImage returns true if file is jpg,jpge or png.', () => {
    component.file = FileMock('img.png', 'image/png');
    expect(component.isImage()).toBeTrue();
  });

  it('should check if isImage return false if file is not mp3 or mp4.', () => {
    expect(component.isImage()).toBeFalse();
  });

  it('should check if isVideo returns true if file is mp3 or mp4.', () => {
    component.file = FileMock('vid.mp4', 'vidoe/mp4');
    expect(component.isVideo()).toBeTrue();
  });

  it('should check if isVideo return false if file is not jpg,jpge or png', () => {
    expect(component.isVideo()).toBeFalse();
  });

  it('should check if isDoc returns true if file is doc or docx.', () => {
    component.file = FileMock('vid.doc', 'application/msword');
    expect(component.isDoc()).toBeTrue();
  });

  it('should check if isDoc return false if file is not doc or docx.', () => {
    expect(component.isDoc()).toBeFalse();
  });

  it('should check if isFile return true if file is txt.', () => {
    expect(component.isFile()).toBeTrue();
  });

  it('should check if isFile return false if file is not txt.', () => {
    component.file = FileMock('vid.doc', 'application/msword');
    expect(component.isFile()).toBeFalse();
  });

  it('should check if isAudio return true if file is mp3,m4a or wma.', () => {
    component.file = FileMock('vid.mp3', 'audio/mpeg');
    expect(component.isAudio()).toBeTrue();
  });

  it('should check if isAudio return false if file is not mp3,m4a or wma.', () => {
    expect(component.isAudio()).toBeFalse();
  });

  it('should emit an event if delete is called.', fakeAsync(() => {
    let isDeleted = false;
    component.deleteEvent.subscribe(_ => isDeleted = true);
    component.delete();
    tick();
    expect(isDeleted).toBeTrue();
  }));
});
