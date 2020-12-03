export interface CreateCategory {
    name: string;
}

export interface UpdateCategory extends CreateCategory {
    id: number;
}

export interface Category extends CreateCategory {
    id: number;
    create_at: string,
    update_at: string,
    url: string;
}
