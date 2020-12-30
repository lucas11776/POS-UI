import faker from 'faker'

import {
    User as UserInterface,
    Profile as ProfileInterface,
    PersonalDetails as PersonalDetailsInterface,
    UploadProfilePicture as UploadProfilePictureInterface,
    Description as DescriptionInterface
} from '../../shared/models/user.model';
import { Image as ImageMock } from './image.mock';
import { Address as AddressMock } from './address.mock';
import { _File as FileMock, _File } from './file.mock';
import { Gender } from '../../shared/models/gender.model';
import { Role } from '../../shared/models/role.model';

export const UploadProfilePicture = (): UploadProfilePictureInterface => {
    return {
        image: _File('sefie.png', 'image/png')
    }
}

export const Description = (): DescriptionInterface => {
    return {
        description: faker.random.words(100)
    }
} 

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
            image: ImageMock('App\\User'),
            email_verified_at: faker.internet.email(),
            email: faker.date.past(),
            cellphone_number: '',
            cellphone_number_verified_at: faker.date.past()
        }
    };
}

export const Profile = (roles: Role[] = []): ProfileInterface => {
    return {
        ... {
            roles: roles,
            address: AddressMock()
        },
        ... User()
    };
}