import { Injectable } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private togglerSuject = new Subject<void>();
  togglerObservable = this.togglerSuject.asObservable().pipe(
    debounceTime(500)
  );

  constructor() { }

  toggle(): void {
    this.togglerSuject.next();
  }
}
