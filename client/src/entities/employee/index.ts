import type{
    EmployeeType,
    EmployeeRequest,
    EmployeeResponse,
    EmployeeForm
} from "./types/employeeTypes"
import { usegetAllEmployee } from "./lib/composible/useGetAllEmployee";
import { useEmployeeStore } from "./lib/model/employeeStore";
import { getAllEmployee } from "./api/getAllEmployee"
import employeeTable from "./ui/employeeTable.vue";

export { usegetAllEmployee,  useEmployeeStore }
export {EmployeeForm, EmployeeRequest, EmployeeResponse, EmployeeType}
export {employeeTable}