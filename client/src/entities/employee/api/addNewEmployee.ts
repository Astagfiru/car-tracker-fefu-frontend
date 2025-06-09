import axios from "axios";
import {EmployeeRequest } from "../types/employeeTypes";
import { EMPLOYEE_PATH } from "../consts/baseUrl";
import { AddEmployeeResponce } from "../types/apiTypes";

export const addEmployee = async (requestBody : EmployeeRequest): Promise<AddEmployeeResponce> => {
  try {
    console.log("here: ");
    console.log(requestBody);
    const response = await axios.post(EMPLOYEE_PATH, requestBody);

    const { data } = response;
    console.log("Сотрудник создан", data)

    return data;
  } catch (error) {
    console.error("Ошибка создания нового сотрудника, подробнее:", error)
    return [];
  }
};