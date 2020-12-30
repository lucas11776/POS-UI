import faker from 'faker';

import {
    Address as AddressInterface,
    UpdateAddress as UpdateAddressInterface
} from '../../shared/models/address.model';

export const Address = (): AddressInterface => {
    return {
        id: Math.floor(Math.random() * 200),
        created_at: faker.date.recent(),
        updated_at: faker.date.recent(),
        address: faker.address.streetAddress(),
        country: faker.address.country(),
        city: faker.address.city(),
        postal_code: Math.floor(Math.random() * 100000).toString(),
    }
}

export const UpdateAddress = (): UpdateAddressInterface => {
    return {
        address: faker.address.streetAddress(),
        country_id: Math.floor(Math.random() * 200),
        city: faker.address.city(),
        postal_code: Math.floor(Math.random() * 100000).toString(),
    }
}