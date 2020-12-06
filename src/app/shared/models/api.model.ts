export interface Response {
    message: string;
    data?: any;
    error?: any;  
}

export interface Error {
    name?: string;
    message: string;
    errors?: [{ (name: string): any }],
    code?: 'NETWORK' | 'SERVER' | 'UNAUTHORIZED'
}