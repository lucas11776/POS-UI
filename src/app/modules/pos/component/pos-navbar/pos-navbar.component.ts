import { Component, OnInit } from '@angular/core';

import { EventBusService } from '../../../../core/services/event-bus.service';

@Component({
  selector: 'ks-pos-navbar',
  templateUrl: './pos-navbar.component.html',
  styleUrls: ['./pos-navbar.component.css']
})
export class PosNavbarComponent implements OnInit {

  constructor(private _eventBusService: EventBusService) { }

  ngOnInit(): void {
  }

  toggleSidebar(): void {
    this._eventBusService.emit({ name: 'SIDEBAR_TOGGLE' });
  }
}
