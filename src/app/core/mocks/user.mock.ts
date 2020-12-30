import faker from 'faker'
import { Image } from './image.mock';

import {
    User as UserInterface,
    Profile as ProfileInterface,
    PersonalDetails as PersonalDetailsInterface } from '../../shared/models/user.model';
import { Gender } from '../../shared/models/gender.model';

export const PersonalDetails = (): PersonalDetailsInterface => {
    return {
        first_name: faker.name.firstName(),
        gender: faker.random.arrayElement(Gender),
        last_name: faker.name.lastName(),
    }
}

export const User = (): UserInterface => {
    return {
        ... PersonalDetails(),
        ... {
            id: Math.floor(Math.random() * 200),
            created_at: faker.date.recent(),
            updated_at: faker.date.recent(),
            email_verified_at: faker.internet.email(),
            email: faker.date.past(),
            cellphone_number: '',
            cellphone_number_verified_at: faker.date.past()
        }
    };
}

export const Profile = (): ProfileInterface => {
    return {
        ... User(),
        ... { image: Image('App\\User') }
    };
}