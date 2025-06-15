import axios from "axios";
import { EmployeeResponse } from "../types/employeeTypes";
import { EMPLOYEE_PATH } from "../consts/baseUrl";

export const getAllEmployee = async (): Promise<EmployeeResponse[]> => {
  try {
    const response = await axios.get<EmployeeResponse[]>(EMPLOYEE_PATH);
    
    const { data } = response;
    console.log("Роли сотрудников", data)
    return (data);
    
  } catch (error) {
    return []
  }
};