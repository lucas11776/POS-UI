import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ks-images-form-control',
  templateUrl: './images-form-control.component.html',
  styleUrls: ['./images-form-control.component.css']
})
export class ImagesFormControlComponent implements OnInit {
  @Input('tilte') title: string = 'Drop files here to upload';

  constructor() { }

  ngOnInit(): void {
  }

}
