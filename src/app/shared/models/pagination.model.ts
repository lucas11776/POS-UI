export interface Paginator {
  current_page: 1,
  data: any;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string;
  path: string;
  per_page: number,
  perv_page_url: string | null;
  to: number;
  total: number;
}