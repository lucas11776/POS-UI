import { Image } from './image.model';

export enum Types {
    product = 'App\\Product',
    service = 'App\\Service',
}

export interface Salable {
    image: Image;
    name: string;
    price: number;
    discount: number;
}