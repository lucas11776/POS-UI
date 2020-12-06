import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { SidebarService } from '../../services/sidebar.service';
import { LogoutModalComponent } from '../logout-modal/logout-modal.component';

@Component({
  selector: 'ks-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(
    private _sidebarService: SidebarService,
    private _ngModal: NgbModal) { }

  toggleSidebar(): void {
    this._sidebarService.toggle();
  }

  logout(): void {
    this._ngModal.open(LogoutModalComponent);
  }
}
