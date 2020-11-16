import { Component, Input, OnChanges, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ks-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertComponent implements OnInit {
  @Input('alert') alert: string = 'success';
  @Input('message') message: string;
  @Input('errors') errors: Object;
  errorsArray: object;

  constructor() { }

  ngOnInit(): void {
    /* istanbul ignore else */
    if(this.errors)
      this.errorsArray = Object.values(this.errors);
  }
}
