import { Component, Output, EventEmitter, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SubSink } from 'subsink';

import { Category, UpdateCategory } from '../../models/category.model';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'ks-categories-list-element',
  templateUrl: './categories-list-element.component.html',
  styleUrls: ['./categories-list-element.component.css']
})
export class CategoriesListElementComponent {
  @Output('update') updateEvent = new EventEmitter<UpdateCategory>();
  @Output('delete') deleteEvent = new EventEmitter<number>();
  @Input('category') category: Category;
  edit: boolean = false;
  confirmationModalComponent: ConfirmationModalComponent;
  sub = new SubSink;

  constructor(private _ngbModal: NgbModal) {  }

  toggleEdit(): void {
    this.edit = !this.edit;
  }

  update($event: UpdateCategory): void {
    this.updateEvent.emit($event);
  }

  delete(): void {
    const modal = this._ngbModal.open(ConfirmationModalComponent);
    this.confirmationModalComponent = <ConfirmationModalComponent>modal.componentInstance;
    this.sub.sink = this.confirmationModalComponent.confirmation
      .subscribe(c => {
        /* istanbul ignore else */
        if(c) this.deleteEvent.emit(this.category.id);
      })
  }
}
