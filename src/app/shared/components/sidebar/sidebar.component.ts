import { DOCUMENT } from '@angular/common';
import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, inject, Inject } from '@angular/core';
import { ChangeDetectionStrategy, NgZone } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';

declare let $: any;

@Component({
  selector: 'ks-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements OnInit, AfterViewInit {
  @ViewChild('sidebar', { read: ElementRef }) sidebar: ElementRef;
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

  protected sidenavSetup(): void {
    let sidenavState = this.sidenavState() ? this.sidenavState() : 'pinned';

    if ($(window).width() > 1200) {
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
    if($(window).width() >= 1200) this.assignPinnedSidenavMargin()
  }

  protected unpinSidenav(): void {
    $(this.sidenavToggler.nativeElement).removeClass('active');
    $(document.body).removeClass('g-sidenav-pinned').addClass('g-sidenav-hidden');
    $(document.body).find('.backdrop').remove();
    this._cookieService.set('sidenav-state', 'unpinned');
    if($(window).width() >= 1200) this.assignUnpinnedSidenavMargin()
  }

  protected sidenavMouseenter() {
    $(this.sidebar.nativeElement).on('mouseenter', () => {
      if (!$(this._document.body).hasClass('g-sidenav-pinned')) {
        $(this._document.body).removeClass('g-sidenav-hide').removeClass('g-sidenav-hidden').addClass('g-sidenav-show');
      }
    });
  }

  protected sidenavMouseleave() {
    $(this.sidebar.nativeElement).on('mouseleave', () => {
      if (!$(this._document.body).hasClass('g-sidenav-pinned')) {
        $(this._document.body).removeClass('g-sidenav-show').addClass('g-sidenav-hide');

        setTimeout(() => {
          $(this._document.body).removeClass('g-sidenav-hide').addClass('g-sidenav-hidden');
        }, 300);
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