import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { EventBusService } from '../../../core/services/event-bus.service';
import { LogoutModalComponent } from '../logout-modal/logout-modal.component';

@Component({
  selector: 'ks-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(
    private _eventBusService: EventBusService,
    private _ngModal: NgbModal) { }

  toggleSidebar(): void {
    this._eventBusService.emit({ name: 'SIDEBAR_TOGGLE' });
  }

  logout(): void {
    this._ngModal.open(LogoutModalComponent);
  }
}
