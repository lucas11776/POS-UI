import faker from 'faker';
import {
    Register as RegisterModel,
    Login as LoginModel,
    Token as TokenModel
} from '../../shared/models/authentication.model';
import { Gender } from '../../shared/models/gender.model';
import {  } from '../../shared/models/authentication.model';

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

export const Login = (): LoginModel => {
    return {
        username: faker.internet.email(),
        password: Password
    }
}

export let Token = (): TokenModel => {
    return {
        token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3QiLCJpYXQiOjE1OTY0OTE1MjMsImV4cCI6MzQ4ODY1MTUyMywibmJmIjoxNTk2NDkxNTIzLCJqdGkiOiJ2TzE3ajlRdXlTWnN3eU9GIiwic3ViIjoiNWYyNzI4ZGE5ODEzNWEwYTY0MDAwZTlkIiwicHJ2IjoiODdlMGFmMWVmOWZkMTU4MTJmZGVjOTcxNTNhMTRlMGIwNDc1NDZhYSJ9.DOnmtZMZjN5Ox3oHDVl0mIJTNmeYk9ArriEYzlMmCvk",
        type: "Bearer",
        expires: 31536000
    }
}