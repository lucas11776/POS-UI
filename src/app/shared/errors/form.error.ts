export const Errors = {
    first_name: {
        required: 'The name is required.',
        min: 'The name most contain a minimum of 3 charactors.',
        max: 'The name most contain maximum of 50 charactors.'
    },
    last_name: {
        required: 'The surname is required.',
        min: 'The surname most contain a minimum of 3 charactors.',
        max: 'The surname most contain maximum of 50 charactors.'
    },
    gender: { },
    email: {
        required: 'The email is required',
        required_empty_cellphone: 'The email is required is cellphone number is not entered.',
        email: 'The email address entered is a invalid email.'
    },
    cellphone_number: {
        required: 'The cellphone number is required.',
        required_empty_email: 'The cellphone number is required if email is not entered.',
        invalid: 'The cellphone number is invalid please include your contry code e.g +27728515168'
    },
    password: {
        required: 'The password is required.',
        min: 'The password most contain a minimum of 8 charactors.',
        max: 'The password most contain a maximum of 20 charactors.',
        invalid: 'The password most contain one uppercase letter one lower case letter a digit and a special charactor !@#$%^& .'
    },
    password_confirmation: {
        required: 'The password confirmation is required.',
        match: 'The password confirmation does not match the password.'
    },
    username: {
        required: 'The username is required.'
    }
}