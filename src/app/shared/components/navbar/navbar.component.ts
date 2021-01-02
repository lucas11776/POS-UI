import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

import { EventBusService } from '../../../core/services/event-bus.service';
import { Profile } from '../../models/user.model';
import { LogoutModalComponent } from '../logout-modal/logout-modal.component';
import { UserService } from '../../../modules/user/shared/user.service';

@Component({
  selector: 'ks-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  profile$: Observable<Profile>;

  constructor(
    private _eventBusService: EventBusService,
    private _ngModal: NgbModal,
    private _userService: UserService) { }

  ngOnInit() {
    this.profile$ = this._userService.profile$;
  }

  toggleSidebar(): void {
    this._eventBusService.emit({ name: 'SIDEBAR_TOGGLE' });
  }

  logout(): void {
    this._ngModal.open(LogoutModalComponent);
  }
}
