import { Component, OnInit } from '@angular/core';

import { EventBusService } from '../../../../core/services/event-bus.service';

@Component({
  selector: 'ks-checkout-navbar',
  templateUrl: './checkout-navbar.component.html',
  styleUrls: ['./checkout-navbar.component.css']
})
export class CheckoutNavbarComponent implements OnInit {

  constructor(private _eventBusService: EventBusService) { }

  ngOnInit(): void {
  }

  toggleSidebar(): void {
    this._eventBusService.emit({ name: 'SIDEBAR_TOGGLE' });
  }
}
