import axios from "axios";
import { EmployeeType } from "../types/employeeTypes";
import { EMPLOYEE_PATH } from "../consts/baseUrl";

export type ClientForm = Omit<EmployeeType, "id">;

export const useGetAllEmployeers = async (): Promise<EmployeeType[]> => {
  try {
    const response = await axios.get<EmployeeType[]>(EMPLOYEE_PATH);
    
    const { data } = response;
    console.log("Сотрудники", data)
    return (data);
    
  } catch (error) {
    return []
  }
};