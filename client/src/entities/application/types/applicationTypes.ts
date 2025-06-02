import { Client } from "@/entities/client/@X/types";

export interface ApplicationResponse {
    id: number;
    client_id: number[];
    employee_id: number[];
    car_id: number[];
    application_date: Date;
    status: string;
}

export type ApplicationRequest = Omit<ApplicationResponse, 'id'>

export type ApplicationForm = {
    clientIds: number[];
    employeeIds: number[];
    carIds: number[];
    applicationDate: Date;
    status: string;
}

export type Application = {
    id : number;
    clients : Client[];
    employees: number[];
    cars: number[];
    applicationDate: Date;
    status: string;
}