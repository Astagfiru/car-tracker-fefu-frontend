import type{
    EmployeeType,
    EmployeeRequest,
    EmployeeResponse,
    EmployeeForm
} from "./types/employeeTypes"
import { usegetAllEmployeers } from "./api/usegetAllEmployee";
import { useEmployeeStore } from "./model/employeeStore";

export { usegetAllEmployeers,  useEmployeeStore }
export {EmployeeForm, EmployeeRequest, EmployeeResponse, EmployeeType}