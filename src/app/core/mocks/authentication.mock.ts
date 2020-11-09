import { factor } from '@rxweb/reactive-form-validators';
import faker from 'faker';
import { Register as RegisterModel, Login as LoginMock } from '../../shared/models/authentication.model';
import { Gender } from '../../shared/models/gender.model';

export const Password: string = 'Test@123';

export const Register = (): RegisterModel => {
    return {
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        gender: faker.random.arrayElement(Gender),
        email: faker.internet.email(),
        cellphone_number: '+27' + Math.floor(Math.random() * 10000000000),
        password: 'Test@123',
        password_confirmation: Password
    }
}

export const Login = (): LoginMock => {
    return {
        username: faker.internet.email(),
        password: Password
    }
}