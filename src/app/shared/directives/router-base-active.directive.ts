import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SubSink } from  'subsink';

@Directive({
  selector: '[routerBaseActive]'
})
export class RouterBaseActiveDirective implements OnInit, OnDestroy {
  @Input('routerBaseActive') base: object = [];
  subSink = new SubSink;

  constructor(
    private _elementRef: ElementRef,
    private _router: Router,
    private _renderer: Renderer2) { }

  ngOnInit(): void {
    this.urlHasBase();
    this.subSink.sink = this._router.events.subscribe(e => {
      /* istanbul ignore else */
      if(e instanceof NavigationEnd) this.urlHasBase();
    });
  }

  ngOnDestroy(): void {
    this.subSink.unsubscribe();
  }

  protected urlHasBase(): void {
    const _class = this.base[1] ? this.base[1] : 'active';
    if(this._router.url.includes(`${this.base[0]}`)) this._renderer.addClass(this._elementRef.nativeElement, _class);
    else this._renderer.removeClass(this._elementRef.nativeElement, _class);
  }
}
