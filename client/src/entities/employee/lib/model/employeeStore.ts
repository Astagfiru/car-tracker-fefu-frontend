import { defineStore } from "pinia";
import { reactive, toRefs } from "vue";
import { EmployeeType, EmployeeForm } from "@/entities/employee";

const EMPLOYEE_STORE_NAME = "employeeStore";

interface EmployeeStore {
  employees: EmployeeType[] | null;
  newEmployee: EmployeeForm | null;
  isLoading: boolean;
  errorMessage: string | null;
}

const employeeStoreInitialState: EmployeeStore = {
  employees: null,
  newEmployee: null,
  isLoading: false,
  errorMessage: null,
};

export const useEmployeeStore = defineStore(EMPLOYEE_STORE_NAME, () => {
  const state = reactive<EmployeeStore>({
    ...employeeStoreInitialState,
  });

  const { employees } = toRefs(state);

  const saveAllEmployees = (newEmployees: EmployeeType[]): void => {
    state.employees = newEmployees;
  };

  const addEmployee = (newEmployee: EmployeeType) => {
    employees.value?.unshift(newEmployee);
  };

  return {
    ...toRefs(state),
    saveAllEmployees,
    addEmployee,
  };
});
