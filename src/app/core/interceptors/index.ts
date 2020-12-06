import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { QueryParamsInterceptor } from './query-params.interceptor';
import { FormDataInterceptor } from './form-data.interceptor';
import { TokenInterceptor } from './token.interceptor';

export const INTERCEPTORS = [
    { provide: HTTP_INTERCEPTORS, useClass: QueryParamsInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: FormDataInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
];