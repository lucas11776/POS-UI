import { Directive, HostListener, Input, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[file]'
})
export class FileDirective implements OnInit {
  @Input('multiple') multiple: boolean = false;

  constructor(
    private _ngControl: NgControl,
    private _elementRef: ElementRef,
    private _renderer: Renderer2) { }

  ngOnInit(): void {
    /* istanbul ignore else */
    if(this.isMultiple()) this.setMultipleAttribute();
  }

  @HostListener('change', ['$event.target.files']) inputChange(files: FileList): void {
    this._ngControl.control.setValue(this.isMultiple() ? files : files[0]);
  }

  protected isMultiple(): boolean {
    return ! (this.multiple == false || this.multiple == undefined);
  }

  private setMultipleAttribute(): void {
    this._renderer.setProperty(this._elementRef.nativeElement, 'multiple', true);
  }
}
