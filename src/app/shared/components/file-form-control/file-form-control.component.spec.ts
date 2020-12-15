import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FileFormControlComponent } from './file-form-control.component';
import { SharedModule } from '../../shared.module';
import { _File as FileMock, FileList as FileListMock } from '../../../core/mocks/file.mock';

declare let $: any;

describe('FileFormControlComponent', () => {
  let component: FileFormControlComponent;
  let fixture: ComponentFixture<FileFormControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FileFormControlComponent
      ],
      imports: [
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileFormControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    component.registerOnChange((...args: unknown[]) => {});
    component.registerOnTouched((...args: unknown[]) => {});
  });

  it('should check if FileFormControl is created.', () => {
    expect(component).toBeTruthy();
  });

  it('should assign File to DataTransfer items when obj is File.', () => {
    component.writeValue(FileMock());
    expect(component.dataTransfer.files.length).toBe(1);
  });

  it('should assign FileList file items to DataTranfer items when obj is FileList.', () => {
    const fileList = FileListMock([FileMock(), FileMock(), FileMock()]);
    component.writeValue(fileList);
    expect(component.dataTransfer.files.length).toBe(fileList.length);
  });

  it('should assign file File in DataTransfer is setValue is called.', () => {
    const fileList = FileListMock([FileMock(), FileMock()]);
    component.control.setValue(fileList);
    component.setValue(fileList);
    expect(component.dataTransfer.files.length).toBe(fileList.length);
  });

  it('should open input select file window when inputClick is called.', () => {
    spyOn(<HTMLInputElement>component.input.nativeElement, 'click').and.returnValue();
    component.inputClick();
    expect(component.input.nativeElement.click).toHaveBeenCalled();
  });

  it('should delete a File in DataTransfer when multiple is true.', () => {
    const fileList = FileListMock([FileMock(), FileMock(), FileMock()]);
    component.multiple = true;
    component.control.setValue(fileList);
    component.setValue(fileList);
    component.delete(1);
    expect(component.dataTransfer.files.length).toBe(fileList.length-1);
  });

  it('should delete a File in DataTransfer when multiple is false.', () => {
    const fileList = FileListMock([FileMock()]);
    component.multiple = false;
    component.control.setValue(fileList);
    component.setValue(fileList);
    component.delete(0);
    expect(component.dataTransfer.files.length).toBe(0);
  });

  it('should clear DataTranfer items.', () => {
    const fileList = FileListMock([FileMock(), FileMock(), FileMock()]);
    component.control.setValue(fileList);
    component.setValue(fileList);
    component.reset();
    expect(component.dataTransfer.files.length).toBe(0);
  });
});
