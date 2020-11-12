import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ks-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input('class') class: string;
  @Input('name') name: string;
  uri: object;

  constructor(private _router: Router) { }

  ngOnInit(): void {
    let currentUri = this._router.url.split('/');
    currentUri.shift();
    this.uri = currentUri;
  }

}
