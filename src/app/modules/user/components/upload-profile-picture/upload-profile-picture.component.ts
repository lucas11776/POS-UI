import { Component, ElementRef, EventEmitter, OnInit, ViewChild, Output, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { SubSink } from 'subsink';

import { UploadProfilePicture } from '../../../../shared/models/user.model';
import { file } from '../../../../core/validators/form-validators';

@Component({
  selector: 'ks-upload-profile-picture',
  templateUrl: './upload-profile-picture.component.html',
  styleUrls: ['./upload-profile-picture.component.css']
})
export class UploadProfilePictureComponent implements OnInit, OnDestroy {
  @Output('upload') uploadEvent = new EventEmitter<UploadProfilePicture>();
  @ViewChild('input', { read: ElementRef }) input: ElementRef;
  sub = new SubSink;
  form: FormGroup;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      image: [null, []]
    });
    this.sub.sink = this.form.valueChanges
      .subscribe(form => this.upload(form))
  }

  open(): void {
    this.input.nativeElement.click();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  protected upload(form: UploadProfilePicture): void {
    /* istanbul ignore else */
    if(this.form.valid) this.uploadEvent.next(form);
  }
}
