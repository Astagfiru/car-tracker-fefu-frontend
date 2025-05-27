export interface Employee {
    id: number;
    surname: string;
    name: string;
    patronomic?: string;
    postion: Postion;
    phone: string;
    email: string;
}

export type EmployeeForm = Omit<Employee, 'id'>

export type Postion = 'position1' | 'position2'

export const enum Positions {
    'position1',
    'position2'
}
