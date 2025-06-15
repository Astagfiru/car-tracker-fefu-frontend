import axios from "axios";
import { EMPLOYEE_PATH } from "../consts/baseUrl";
import { UpdateEmployeeResponse } from "../types/apiTypes";
import { EmployeeType } from "../types/employeeTypes";

export const updateEmployee = async (updatedEmployee : EmployeeType): Promise<UpdateEmployeeResponse> => {
  try {
     const url = `${EMPLOYEE_PATH}/${updatedEmployee.id}`;

    console.log("Обновление сотрудника с данными:", updatedEmployee);
    const response = await axios.put(url, updatedEmployee);

    const { data } = response;
    console.log("Сотрудник обновлен", data)

    return data;
  } catch (error) {
    console.error("Ошибка обновления сотрудника, подробнее:", error)
    return [];
  }
};