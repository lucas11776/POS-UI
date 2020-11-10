import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  constructor(private _ngxSpinnerService: NgxSpinnerService) { }

  ngOnInit() {
    this._ngxSpinnerService.show();
  }
}
