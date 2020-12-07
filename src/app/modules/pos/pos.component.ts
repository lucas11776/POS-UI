import { Component, OnInit } from '@angular/core';

declare let $: any;

@Component({
  selector: 'ks-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.css']
})
export class PosComponent implements OnInit {
  height: number = $(window).height();

  constructor() { }

  ngOnInit(): void {
  }

}
