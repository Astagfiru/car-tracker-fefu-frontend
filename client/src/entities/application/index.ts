import type { ClientType } from '@/entities/client';

export interface ApplicationResponse {
    id: Number;
    client_id: number;
    employee_id : number;
    car_id: number;
    date: Date;
    status: ApplicationStatuses;
}

export interface ApplicationForm  {
    client: ClientType;
    employee_id : number;
    car_id: number;
    date: Date;
    status: ApplicationStatuses;
}

export type ApplicationStatuses = 'НОВАЯ' | 'В РАБОТЕ' | 'ЗАВЕРШЕНА'|  'ОТМЕНЕНА'

type Modify<T, R> = Omit<T, keyof R> & R
