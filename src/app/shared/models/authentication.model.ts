export interface Register {
    first_name: string;
    last_name: string;
    gender: string;
    email: string,
    cellphone_number: string,
    password: string;
    password_confirmation: string;
}

export interface Login {
    username: string;
    password: string;
}