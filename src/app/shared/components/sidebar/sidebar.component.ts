import { DOCUMENT } from '@angular/common';
import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, Inject, OnDestroy } from '@angular/core';
import { ChangeDetectionStrategy, NgZone } from '@angular/core';
import { debounceTime, map } from 'rxjs/operators';
import { timer } from 'rxjs';
import { SubSink } from 'subsink';

import { CookieService } from 'ngx-cookie-service';
import { EventBusService } from '../../../core/services/event-bus.service';

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
  sub = new SubSink;

  constructor(
    @Inject(DOCUMENT) private _document: Document,
    private _ngZone: NgZone,
    private _cookieService: CookieService,
    private _eventBusService: EventBusService) { }

  ngOnInit(): void {
    this.sub.sink = this._eventBusService.event.pipe(
      map(e => e.name == 'SIDEBAR_TOGGLE'),
      debounceTime(500))
      .subscribe(_ => this.sidenavToggle())
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
    this.sub.unsubscribe();
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
    this._cookieService.set('sidenav-state', 'pinned');
    $(this.sidenavToggler.nativeElement).addClass('active');
    $(this._document.body).removeClass('g-sidenav-hidden').addClass('g-sidenav-show g-sidenav-pinned');
    /* istanbul ignore else */
    if(!$(this.sidenav.nativeElement).is(':hover'))
      $(this._document.body).removeClass('g-sidenav-hide').removeClass('g-sidenav-hidden').addClass('g-sidenav-show');
    /* istanbul ignore else */
    if($(window).width() >= 1200) this.assignPinnedSidenavMargin()
  }

  protected unpinSidenav(): void {
    $(this._document.body).find('.backdrop').remove();
    this._cookieService.set('sidenav-state', 'unpinned');
    $(this.sidenavToggler.nativeElement).removeClass('active');
    $(this._document.body).removeClass('g-sidenav-pinned').addClass('g-sidenav-hidden');
     /* istanbul ignore else */
    if(!$(this.sidenav.nativeElement).is(':hover'))
      $(this._document.body).removeClass('g-sidenav-show').addClass('g-sidenav-hide');
    /* istanbul ignore else */
    if($(window).width() >= 1200) this.assignUnpinnedSidenavMargin();
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
        this.sub.sink = timer(300)
          .subscribe(_ => $(this._document.body).removeClass('g-sidenav-hide').addClass('g-sidenav-hidden'));
      }
    });
  }

  protected screenResize() {
    $(window).resize(() => {
      if($(window).width() >= 1200)
        if(this.sidenavState() == 'pinned') this.assignPinnedSidenavMargin();
        else this.assignUnpinnedSidenavMargin();
      else
        this.removeSidenavMargin();
    });
  }

  protected bodyClick() {
    $(this._document.body).click((e: Event) => {
      /* istanbul ignore else */
      if($(e.target).is('body'))
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