import { Directive, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[file]'
})
export class FileDirective {
  @Input('multiple') multiple;

  constructor(private _ngControl: NgControl) { }

  @HostListener('change', ['$event.target.files']) inputChange(files: FileList) {
    this._ngControl.control.setValue(this.multiple === undefined ? files[0] : files);
  }
}
