import axios from "axios";
import { EmployeeRoleResponse } from "../types/employeeTypes";
import { EMPLOYEE_ROLE_PATH } from "../consts/baseUrl";

export const getAllEmployeeRoles = async (): Promise<EmployeeRoleResponse[]> => {
  try {
    const response = await axios.get<EmployeeRoleResponse[]>(EMPLOYEE_ROLE_PATH);
    
    const { data } = response;
    console.log("Роли сотрудников", data)
    return (data);
    
  } catch (error) {
    return []
  }
};