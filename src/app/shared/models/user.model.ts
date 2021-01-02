import { Image } from './image.model';
import { Role } from './role.model';
import { Address } from './address.model';

export interface PersonalDetails {
    first_name: string;
    last_name: string;
    gender: string | null;
}

export interface UploadProfilePicture {
    image: File
}

export interface CellphoneNumber {
    cellphone_number: string | null;
}

export interface Email {
    email: string | null;
}

export interface Description {
    description?: string;
}

export interface ContactDetails extends CellphoneNumber, Email {  }

export interface User extends PersonalDetails, CellphoneNumber, Email, Description {
    id: number;
    created_at: string;
    updated_at: string;
    image: Image;
    cellphone_number_verified_at: string | null;
    email_verified_at: string | null;
}

export interface Profile extends User {
    address?: Address;
    roles: Role[];
}

export interface UploadProfilePicture {
    image: File;
}