import {
  EmployeeForm,
  EmployeeRequest,
  EmployeeResponse,
  EmployeeType,
} from "../../types/employeeTypes";

export const mapEmployeeResponseToUi = (employee: EmployeeResponse): EmployeeType => {
  return {
    id: employee.id,
    last_name: employee.last_name,
    first_name: employee.first_name,
    middle_name: employee.middle_name,
    phone: employee.phone,
    email: employee.email,
    position: employee.position
  };
};

export const mapEmployeeUiToApi = (employee: EmployeeForm): EmployeeRequest => {
  return {
    last_name: employee.last_name,
    first_name: employee.first_name,
    middle_name: employee.middle_name,
    phone: employee.phone,
    email: employee.email,
    position: employee.position
  };
};

export const mapEmployeesResponseToUi = (client: EmployeeResponse[]): EmployeeType[] => {
  return client.map(mapEmployeeResponseToUi);
};
