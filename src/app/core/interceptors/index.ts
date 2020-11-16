import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { FormDataInterceptor } from './form-data.interceptor';

export const INTERCEPTORS = [
    { provide: HTTP_INTERCEPTORS, useClass: FormDataInterceptor, multi: true }
];