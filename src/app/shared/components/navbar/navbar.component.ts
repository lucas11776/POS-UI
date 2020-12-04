import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { SidebarService } from '../../services/sidebar.service';
import { LogoutModalComponent } from '../logout-modal/logout-modal.component';

@Component({
  selector: 'ks-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private _sidebarService: SidebarService,
    private _ngModal: NgbModal) { }

  ngOnInit(): void {
  }

  toggleSidebar(): void {
    this._sidebarService.toggle();
  }

  logout() {
    let modal = this._ngModal.open(LogoutModalComponent);
  }
}
