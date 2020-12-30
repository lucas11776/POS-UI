export interface Message {
    message: string;
}

export interface Response extends Message {
    data?: any;
    error?: any;  
}

export interface Error {
    name?: string;
    message: string;
    errors?: [{ (name: string): any }],
    code?: 'NETWORK' | 'SERVER' | 'UNAUTHORIZED'
}