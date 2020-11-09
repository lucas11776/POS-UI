import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(private _toastrSerive: ToastrService) { }

  success(title?: string, message?: string): void {
    this._toastrSerive.success(message, title);
  }

  info(title?: string, message?: string): void {
    this._toastrSerive.info(message, title);
  }

  warning(title?: string, message?: string): void {
    this._toastrSerive.warning(message, title);
  }

  danger(title?: string, message?: string): void {
    this._toastrSerive.error(message, title);
  }
}
