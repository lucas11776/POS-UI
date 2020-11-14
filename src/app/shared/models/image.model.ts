export interface Image {
    id: number;
    create_at: string,
    update_at: string,
    imageable_id: number,
    imageable_type: string;
    path: string,
    url: string
}
