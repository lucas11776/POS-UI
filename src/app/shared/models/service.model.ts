import { Image } from './image.model';
import { Category } from './category.model';
import { Paginator } from './pagination.model';

export interface UpdateService {
    category_id: number | null;
    name: string,
    price: number;
    discount: number | null;
    in_stock: number;
    description: string;
}

export interface CreateService extends UpdateService {
    image: File;
    images: FileList | null;
}

export interface Service extends UpdateService {
    id: number,
    created_at: number;
    updated_at: number;
    deleted_at: string | null;
    url: string,
    category: Category | null;
    image: Image;
    images: Image[] | null;
}

export interface ServicesPagination extends Paginator {
    data: Service[];
}