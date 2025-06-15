import type{
    EmployeeType,
    EmployeeRequest,
    EmployeeResponse,
    EmployeeForm
} from "./types/employeeTypes"
import { useGetAllEmployee } from "./lib/composible/useGetAllEmployee";
import { useEmployeeStore } from "./lib/model/employeeStore";
import { getAllEmployee } from "./api/getAllEmployee"
import employeeTable from "./ui/EmployeeTable.vue";

export { useGetAllEmployee,  useEmployeeStore }
export {EmployeeForm, EmployeeRequest, EmployeeResponse, EmployeeType}
export {employeeTable}