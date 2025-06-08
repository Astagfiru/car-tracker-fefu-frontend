import axios from "axios";
import { EMPLOYEE_PATH } from "../consts/baseUrl";
import { DeleteEmployeeResponse } from "../types/apiTypes";
import { DeleteEmployeeParams } from "../types/apiTypes";

export const deleteEmployee = async (employeeId: DeleteEmployeeParams): Promise<DeleteEmployeeResponse> => {
  try {
    const url = `${EMPLOYEE_PATH}/${employeeId}`;

    const response = await axios.delete(url);

    console.log(`Сотрудник с ID ${employeeId} удален`);
    
    return response
  } catch (error) { 
    console.error("Ошибка удаления сотрудника, подробнее:", error)
    return error;
  }
};
