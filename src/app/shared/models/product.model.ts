import { Image } from './image.model';
import { Category } from './category.model';

export interface UpdateProduct {
    category_id: number | null;
    name: string,
    price: number;
    discount: number | null;
    in_stock: number;
    barcode: string | null;
    description: string;
}

export interface CreateProduct extends UpdateProduct {
    image: File;
    images: File[] | null;
}

export interface Product extends UpdateProduct {
    id: number,
    create_at: number;
    update_at: number;
    deleted_at: string | null;
    url: string,
    category: Category | null;
    image: Image;
    images: Image[] | null;
}