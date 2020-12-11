import { ElementRef, Renderer2, RendererFactory2 } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { NavigationEnd, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { RouterBaseActiveDirective } from './router-base-active.directive';
import { Router as RouterMock, Subject as SubjectEvent } from '../../core/mocks/router.mock';

declare let $: any;

describe('RouterBaseActiveDirective', () => {
  let directive: RouterBaseActiveDirective;
  let elementRef: ElementRef;
  let renderer: Renderer2;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      providers: [
        { provide: Router, useValue: RouterMock }
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

  it('should call urlHasBase when router NavigateEnd event has been emmited.', fakeAsync(() => {
    directive.base = [''];
    spyOn(router.url, 'includes').and.returnValue(true);
    directive.ngOnInit();
    $(elementRef.nativeElement).removeClass('active');
    SubjectEvent.next(new NavigationEnd(1, '/', '/'));
    expect($(elementRef.nativeElement).hasClass('active')).toBeTrue();
  }));
});
