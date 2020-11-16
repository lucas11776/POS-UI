import { ElementRef, Renderer2, RendererFactory2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterBaseActiveDirective } from './router-base-active.directive';

declare let $: any;

describe('RouterBaseActiveDirective', () => {
  let directive: RouterBaseActiveDirective;
  let elementRef: ElementRef;
  let renderer: Renderer2;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ]
    });
  });

  beforeEach(() => {
    elementRef = new ElementRef(document.createElement('DIV'));
    renderer = TestBed.inject(RendererFactory2).createRenderer(null, null);
    router = TestBed.inject(Router);
    directive = new RouterBaseActiveDirective(elementRef, router, renderer);
  });


  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should add defualt active class if router is in base route.', () => {
    directive.base = [''];
    spyOn(router.url, 'includes').and.returnValue(true);
    directive.ngOnInit();
    expect($(elementRef.nativeElement).hasClass('active')).toBeTrue();
  });

  it('should add given class to element if router is in base route.', () => {
    directive.base = ['', 'show'];
    spyOn(router.url, 'includes').and.returnValue(true);
    directive.ngOnInit();
    expect($(elementRef.nativeElement).hasClass('show')).toBeTrue();
  });
});
