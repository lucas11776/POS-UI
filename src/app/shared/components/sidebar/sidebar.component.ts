import { DOCUMENT } from '@angular/common';
import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, Inject, OnDestroy } from '@angular/core';
import { ChangeDetectionStrategy, NgZone } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';
import { timer } from 'rxjs';

declare let $: any;

@Component({
  selector: 'ks-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('sidenav', { read: ElementRef }) sidenav: ElementRef;
  @ViewChild('scrollbar', { read: ElementRef }) scrollbar: ElementRef;
  @ViewChild('sidenavToggler', { read: ElementRef }) sidenavToggler: ElementRef;

  constructor(
    @Inject(DOCUMENT) private _document: Document,
    private _ngZone: NgZone,
    private _cookieService: CookieService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this._ngZone.runOutsideAngular(() => {
      this.sidenavSetup();
      this.sidenavMouseenter();
      this.sidenavMouseleave();
      this.screenResize();
      this.bodyClick();
    });
  }
  
  sidenavToggle(): void {
    if(this.sidenavState() == 'pinned') this.unpinSidenav()
    else this.pinSidenav();
  }

  ngOnDestroy() {
    this.removeSidenavMargin();
  }

  protected sidenavSetup(): void {
    let sidenavState = this.sidenavState() ? this.sidenavState() : 'pinned';

    /* istanbul ignore else */
    if ($(window).width() >= 1200) {
        if (sidenavState == 'pinned') this.pinSidenav()
        else this.unpinSidenav();
    }

    // jQuery Scrollbar Plugin
    $(this.scrollbar.nativeElement).scrollbar().scrollLock();
  }

  protected pinSidenav(): void {
    $(this.sidenavToggler.nativeElement).addClass('active');
    $(this._document.body).removeClass('g-sidenav-hidden').addClass('g-sidenav-show g-sidenav-pinned');
    this._cookieService.set('sidenav-state', 'pinned');
    /* istanbul ignore else */
    if($(window).width() >= 1200) this.assignPinnedSidenavMargin()
  }

  protected unpinSidenav(): void {
    $(this.sidenavToggler.nativeElement).removeClass('active');
    $(document.body).removeClass('g-sidenav-pinned').addClass('g-sidenav-hidden');
    $(document.body).find('.backdrop').remove();
    this._cookieService.set('sidenav-state', 'unpinned');
    /* istanbul ignore else */
    if($(window).width() >= 1200) this.assignUnpinnedSidenavMargin()
  }

  protected sidenavMouseenter() {
    $(this.sidenav.nativeElement).on('mouseenter', () => {
      /* istanbul ignore else */
      if (!$(this._document.body).hasClass('g-sidenav-pinned')) {
        $(this._document.body).removeClass('g-sidenav-hide').removeClass('g-sidenav-hidden').addClass('g-sidenav-show');
      }
    });
  }

  protected sidenavMouseleave() {
    $(this.sidenav.nativeElement).on('mouseleave', () => {
      /* istanbul ignore else */
      if (!$(this._document.body).hasClass('g-sidenav-pinned')) {
        $(this._document.body).removeClass('g-sidenav-show').addClass('g-sidenav-hide');
        timer(300)
          .subscribe(_ => $(this._document.body).removeClass('g-sidenav-hide').addClass('g-sidenav-hidden'));
      }
    });
  }

  protected screenResize() {
    $(window).resize(() => {
      if($(window).width() >= 1200) {
        if(this.sidenavState() == 'pinned') this.assignPinnedSidenavMargin();
        else this.assignUnpinnedSidenavMargin();
      } else {
        this.removeSidenavMargin();
      }
    });
  }

  protected bodyClick() {
    $(this._document.body).click(() => {
      /* istanbul ignore else */
      if($(window).width() < 1200) this.unpinSidenav()
    });
  }

  protected sidenavState(): string {
    return this._cookieService.get('sidenav-state');
  }

  protected assignPinnedSidenavMargin(): void {
    $(this._document.body).css('margin-left', 250);
  }

  protected assignUnpinnedSidenavMargin(): void {
    $(this._document.body).css('margin-left', 62);
  }

  protected removeSidenavMargin(): void {
    $(this._document.body).css('margin-left', 0);
  }
}