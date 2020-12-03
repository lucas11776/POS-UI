export interface Error {
    name?: string;
    message: string;
    errors?: [{ (name: string): any }]
  }