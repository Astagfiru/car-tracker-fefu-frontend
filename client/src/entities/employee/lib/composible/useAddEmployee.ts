import { EmployeeRequest, EmployeeForm } from "./../../types/employeeTypes";
import { ref, watch, Ref } from "vue";
import { useFetch } from "@/shared";
import { addEmployee } from "../../api/addNewEmployee";
import { mapEmployeeUiToApi } from "../mappers";
import { AddEmployeeResponce } from "../../types/apiTypes";
import { useGetAllEmployee } from "./useGetAllEmployee";

interface AddEmployeeReturn {
  error: Ref<unknown | null>;
  isLoading: Ref<boolean>;
  responseData: Ref<AddEmployeeResponce | null>;
  addEmployee: () => void;
}

export const useAddEmployee = (newEmployee: EmployeeForm): AddEmployeeReturn => {
  const { responseData, error, isLoading, sendRequest } = useFetch<AddEmployeeResponce, EmployeeRequest>(addEmployee);

  const mappedEmployee = ref<EmployeeRequest>();

  const { refetch } = useGetAllEmployee();

  const refetchAndUpdate = async () => {
    try {
      const mapped = mapEmployeeUiToApi(newEmployee);
      console.log('Mapped employee data:', mapped);

      await sendRequest(mapped);

      if (responseData.value) {
        await refetch();
      }
    } catch (err) {
      console.error("Error adding employee:", err);
      throw err;
    }
  };

  watch(responseData, () => {
    if (responseData.value) {
      console.log('addEmployee');
      mappedEmployee.value = mapEmployeeUiToApi(newEmployee);
    }
  });

  return {
    error,
    isLoading,
    addEmployee: refetchAndUpdate,
    responseData
  };
};