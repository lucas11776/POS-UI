import { Provider } from '@angular/core';
import { JWT_OPTIONS } from '@auth0/angular-jwt';

import { TokenService } from '../authentication/token.service';

export const JwtOptionsFactory = (tokenService: TokenService) => {
    return {
        tokenGetter: () => tokenService.token(),
        allowedDomains: [ 'localhost', 'localhost:2000', 'localhost:3000', 'localhost:4200', '192.168.0.147:81' ]
    };
}

export const JwtOptionsProvider: Provider = {
    provide: JWT_OPTIONS,
    useFactory: JwtOptionsFactory,
    deps: [ TokenService ]
}