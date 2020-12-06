import { Paginator } from '../../shared/models/pagination.model';

export const Pagination = (data: any[], total: number): Paginator  => {
    return {
        current_page: 1,
        data: data,
        first_page_url: '',
        from: null,
        last_page: null,
        last_page_url: null,
        next_page_url: null,
        path: null,
        per_page: data.length,
        perv_page_url: null,
        to: null,
        total: total,
    }
}