import { Image } from './image.model';
import { Category } from './category.model';
import { Paginator } from './pagination.model';

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
    images: FileList | null;
}

export interface Product extends UpdateProduct {
    id: number,
    created_at: number;
    updated_at: number;
    deleted_at: string | null;
    url: string,
    category: Category | null;
    image: Image;
    images: Image[] | null;
}

export interface ProductsPagination extends Paginator {
    data: Product[];
}