import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

@Component({
  selector: 'ks-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent {
  @Output('confirmation') confirmation = new EventEmitter<boolean>();
  @Input('header') header: string = 'Complete action.';
  @Input('message') message: string = 'Are you sure you want to complete this action.';

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
