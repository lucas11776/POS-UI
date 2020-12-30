import faker from 'faker';

import { Address as AddressInterface } from '../../shared/models/address.model';

export const Address = (): AddressInterface => {
    return {
        address: faker.address.streetAddress(),
        country: faker.address.country(),
        city: faker.address.city(),
        postal_code: Math.floor(Math.random() * 100000).toString(),
    }
}