import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SubSink } from 'subsink';

import { ServicesPagination } from '../../../../shared/models/service.model';
import { ServicesService } from '../../shared/services.service';
import { Error } from '../../../../shared/models/api.model';

@Component({
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  services: ServicesPagination;
  sub = new SubSink;
  error: Error;

  constructor(
    private _servicesService: ServicesService,
    private _ngxSpinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getServices();
  }

  pagination(event$: number) {
    this.getServices();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  protected getServices(): void {
    this.error = null;
    this._ngxSpinnerService.show();
    this.sub.sink = this._servicesService.get()
      .subscribe(
        services => this.servicesSuccess(services),
        error => this.servicesFailed(error));
  }

  protected servicesSuccess(products: ServicesPagination): void {
    this.services = products;
    this._ngxSpinnerService.hide();
    window.scroll(0,0);
  }

  protected servicesFailed(error: Error): void {
    this.error = error;
    this._ngxSpinnerService.hide();
  }
}
