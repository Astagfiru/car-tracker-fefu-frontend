import type{
    EmployeeType,
    EmployeeRequest,
    EmployeeResponse,
    EmployeeForm
} from "./types/employeeTypes"
import { useGetAllEmployeers } from "./api/useGetAllEmployee";
import { useEmployeeStore } from "./model/employyeeStore";

export { useGetAllEmployeers,  useEmployeeStore }
export {EmployeeForm, EmployeeRequest, EmployeeResponse, EmployeeType}