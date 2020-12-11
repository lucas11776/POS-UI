import { Directive, ElementRef, OnInit } from '@angular/core';

declare let $: any;

@Directive({
  selector: '[scrollbar]'
})
export class ScrollbarDirective implements OnInit {

  constructor(private _elementRef: ElementRef) { }

  ngOnInit() {
    $(this._elementRef.nativeElement).scrollbar();
  }
}
