import { defineStore } from "pinia";
import { reactive, toRefs } from "vue";
import { EmployeeType, EmployeeForm, EmployeeRoleResponse } from "@/entities/employee";

const EMPLOYEE_STORE_NAME = "employeeStore";

const mockedRoles : EmployeeRoleResponse[] = [
    { id: 1, name: 'Администратор', level_of_access: 1 },
    { id: 2, name: 'Бухгалтер', level_of_access: 2 },
]

interface EmployeeStore {
  employees: EmployeeType[] | null;
  roles: EmployeeRoleResponse[] | null;
  newEmployee: EmployeeForm | null;
  isLoading: boolean;
  errorMessage: string | null;
}

const employeeStoreInitialState: EmployeeStore = {
  employees: null,
  newEmployee: null,
  roles: mockedRoles,
  isLoading: false,
  errorMessage: null,
};

export const useEmployeeStore = defineStore(EMPLOYEE_STORE_NAME, () => {
  const state = reactive<EmployeeStore>({
    ...employeeStoreInitialState,
  });

  const { employees } = toRefs(state);

  const saveAllEmployees = (newEmployees: EmployeeType[]): void => {
    employees.value = newEmployees;
    console.log("store", employees.value)
  };

  const saveAllEmployeeRoles = (newRoles: EmployeeRoleResponse[]): void => {
    state.roles = newRoles;
  }

  const addEmployee = (newEmployee: EmployeeType) => {
    employees.value?.unshift(newEmployee);
  };

  return {
    ...toRefs(state),
    saveAllEmployees,
    saveAllEmployeeRoles,
    addEmployee,
  };
});
