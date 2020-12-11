import { RouterEvent } from '@angular/router';
import { ReplaySubject } from 'rxjs';

import { RouterMock } from '../../shared/models/router.model';

export const Subject = new ReplaySubject<RouterEvent>(1);

export const Router: RouterMock = {
    navigation: jasmine.createSpy('navigation'),
    events: Subject.asObservable(),
    url: ''
}