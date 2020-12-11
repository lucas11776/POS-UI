import { RouterEvent } from '@angular/router';
import { Observable } from 'rxjs';
import { Spy } from 'jasmine/bin/jasmine'

export interface RouterMock {
    navigation: Spy<any>,
    events: Observable<RouterEvent>,
    url: string
}