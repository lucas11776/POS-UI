import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

@Component({
  selector: 'ks-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent {
  @Output('confirmation') confirmation = new EventEmitter<boolean>();

  constructor(public _ngbActiveModal: NgbActiveModal) { }

  confirm(): void {
    this.confirmation.emit(true);
    this._ngbActiveModal.close();
  }

  close(): void {
    this.confirmation.emit(false);
    this._ngbActiveModal.close();
  }
}
