export interface Address {
    id: number,
    created_at: string;
    updated_at: string;
    address: string | null;
    country: string | null;
    city: string | null;
    postal_code: string | null;
}

export interface UpdateAddress {
    address?: string;
    country_id?: number;
    city?: string;
    postal_code?: string;
}