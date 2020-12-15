import { Component, Input, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';

@Component({
  selector: 'ks-file-form-control',
  templateUrl: './file-form-control.component.html',
  styleUrls: ['./file-form-control.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: FileFormControlComponent, multi: true }
  ]
})
export class FileFormControlComponent implements ControlValueAccessor {
  @ViewChild('input', { read: ElementRef }) input: ElementRef;
  @Input('title') title: string = 'Select files here to upload.';
  @Input('multiple') multiple: boolean = false;
  @Input('error') error: boolean = false;
  dataTransfer = new DataTransfer();
  control = new FormControl();

  constructor(private _renderer: Renderer2) {  }

  onChange: Function;
  onTouched: Function;
  isDisabled: boolean;

  writeValue(obj?: any): void {
    this.setFiles(obj);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setValue(files: FileList): void {
    this.setFiles(this.control.value);
    this.onChange(this.control.value);
    this.onTouched();
  }

  inputClick(): void {
    this.input.nativeElement.click();
  }

  delete($event: number): void {
    this.dataTransfer.items.remove($event);
    this.multiple ? this.setControls(this.dataTransfer.files) : this.resetControls();
  }

  reset(): void {
    this.onChange(null);
    this.dataTransfer.items.clear();
    this.clearInputValue();
  }

  protected setFiles(data: any): void {
    /* istanbul ignore else */
    if(data instanceof File) this.addFile(data);
    else if(data instanceof FileList) this.addFiles(data);
  }

  protected addFile(file: File): void {
    this.dataTransfer.items.add(file);
  }

  protected addFiles(files: FileList): void {
    for(let i = 0; i < files.length; i++) this.addFile(files[i]);
  }

  protected clearInputValue(): void {
    this.input.nativeElement.value = null;
  }

  private setControls(files: File | FileList): void {
      this.control.setValue(files);
      this.onChange(files);
  }

  private resetControls(): void {
      this.control.setValue(null);
      this.onChange(null);
  }
}
