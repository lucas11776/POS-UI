import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Event {
  name: 'CATEGORY_CREATED' | 'SIDEBAR_TOGGLE',
  payload?: any;
}

@Injectable({
  providedIn: 'root'
})
export class EventBusService {
  private eventSubject = new Subject<Event>();
  event = this.eventSubject.asObservable();

  constructor() { }

  emit(event: Event): void {
    this.eventSubject.next(event);
  }
}
