import axios from "axios";
import { Employee } from "../types/employeeTypes";
import { EMPLOYEE_PATH } from "../consts/baseUrl";

export type NewClient = Omit<Employee, "id">;

export const useGetAllClients = async (): Promise<Employee[]> => {
  try {
    const response = await axios.get<Employee[]>(EMPLOYEE_PATH);
    
    const { data } = response;

    return (data);
    
  } catch (error) {
    return []
  }
};