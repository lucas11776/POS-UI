import { async, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { NgbModule, NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ConfirmationModalComponent } from './confirmation-modal.component';

describe('ConfirmationModalComponent', () => {
  let component: ConfirmationModalComponent;
  let modalRef: NgbModalRef;
  let ngbModal: NgbModal;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ConfirmationModalComponent
      ],
      imports: [
        NgbModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    ngbModal = TestBed.inject(NgbModal);
    modalRef = ngbModal.open(ConfirmationModalComponent);
    component = modalRef.componentInstance;
  });

  beforeEach(() => {
    spyOn(component._ngbActiveModal, 'close').and.returnValue();
  });

  it('should check if ConfirmnationModal component is created.', () => {
    expect(component).toBeTruthy();
  });

  it('should emit true states if confirm is called.', fakeAsync(() => {
    component.confirmation.subscribe(c => expect(c).toBeTrue());
    component.confirm();
    tick();
  }));

  it('should check if modal is close when confirm is called.', () => {
    component.confirm();
    expect(component._ngbActiveModal.close).toHaveBeenCalled();
  });

  it('should emit false states if close is called.', fakeAsync(() => {
    component.confirmation.subscribe(c => expect(c).toBeFalse());
    component.close();
    tick();
  }));

  it('should check if modal is close when close is called.', () => {
    component.close();
    expect(component._ngbActiveModal.close).toHaveBeenCalled();
  });
});
