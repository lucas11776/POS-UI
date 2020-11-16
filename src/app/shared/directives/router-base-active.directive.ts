import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[routerBaseActive]'
})
export class RouterBaseActiveDirective implements OnInit {
  @Input('routerBaseActive') base: object;

  constructor(
    private _elementRef: ElementRef,
    private _router: Router,
    private _renderer: Renderer2) { }

  ngOnInit() {
    /* istanbul ignore else */
    if(this._router.url.includes(`/${this.base[0]}`))
      this._renderer.addClass(this._elementRef.nativeElement, this.base[1] ? this.base[1] : 'active');
  }
}
