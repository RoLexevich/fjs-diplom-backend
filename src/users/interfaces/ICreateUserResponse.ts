import { ID } from 'src/types/id';
export interface ICreateUserResponse {
    id: ID;
    email: string;
    name: string;
    contactPhone: string;
    role: string;
  }