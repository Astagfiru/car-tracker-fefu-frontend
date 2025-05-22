export interface Employee {
    id: number;
    last_name: string;
    first_name: string;
    middle_name?: string;
    postion: Postion;
    phone: string;
    email: string;
}

export type EmployeeForm = Omit<Employee, 'id'>

export type Postion = 'position1' | 'position2'
