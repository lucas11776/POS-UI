import { ElementRef } from '@angular/core';

import { ScrollbarDirective } from './scrollbar.directive';

declare let $: any;

describe('ScrollbarDirective', () => {
  let directive: ScrollbarDirective;
  let div: HTMLDivElement;
  let elementRef: ElementRef;

  beforeEach(() => {
    div = document.createElement('div');
    elementRef = new ElementRef(div);
    directive = new ScrollbarDirective(elementRef);
  });

  it('should check if scrollbar directive is created.', () => {
    expect(directive).toBeTruthy();
  });

  it('should check if scrollbar is applyed to element.', () => {
    spyOn($.fn, 'scrollbar').and.returnValue('applyed');
    directive.ngOnInit();
    expect($(div).scrollbar()).toBe('applyed');
  });
});
