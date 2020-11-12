import { Component, OnInit } from '@angular/core';

import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'ks-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private _sidebarService: SidebarService) { }

  ngOnInit(): void {
  }

  toggleSidebar(): void {
    this._sidebarService.toggle();
  }
}
