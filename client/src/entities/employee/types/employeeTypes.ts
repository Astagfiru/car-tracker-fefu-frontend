

export type Position = 'manager' | 'admin' | "";

export const enum Positions {
  position1 = 'manager',
  position2 = 'admin',
}

export interface EmployeeType {
  id: number;
  last_name: string;
  first_name: string;
  middle_name?: string;
  position: Position;
  phone: string;
  email: string;
  user_id: number;
}

export interface EmployeeResponse {
  id: number;
  last_name: string;
  first_name: string;
  middle_name?: string;
  position: Position;
  phone: string;
  email: string;
  user_id: number;
}

export type EmployeeRequest = Omit<EmployeeResponse, 'id'>


export type EmployeeForm = Omit<EmployeeType, 'id'>;
