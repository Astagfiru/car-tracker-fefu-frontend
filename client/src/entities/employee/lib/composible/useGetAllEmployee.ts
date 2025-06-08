import {
    EmployeeResponse,
    EmployeeType
} from "../../types/employeeTypes";
import { ref, watch, Ref } from "vue";
import { useEmployeeStore } from "../model/employeeStore";
import { useFetch } from "@/shared";
import { getAllEmployee } from "../../api/getAllEmployee";
import {mapEmployeesResponseToUi} from "../mappers"

interface getAllEmployeeReturn {
  employeeResponse: Ref<EmployeeType[] | null>,
  error: Ref<unknown | null>,
  isLoading: Ref<boolean>,
  refetch: () => void,
}

export const usegetAllEmployee =  (): getAllEmployeeReturn => {
  const { responseData, error, isLoading, sendRequest } =
    useFetch<EmployeeResponse[]>(getAllEmployee);

  const mappedEmployees = ref<EmployeeType[]>([]);

  const employeeStore = useEmployeeStore();

  const { saveAllEmployees } = employeeStore;

  watch(responseData, () => {
    
    if (responseData.value) {
      mappedEmployees.value = mapEmployeesResponseToUi(responseData.value);

      saveAllEmployees(mappedEmployees.value);
    }
  });

  sendRequest();

  return {
    employeeResponse: mappedEmployees,
    error,
    isLoading,
    refetch: () => sendRequest(undefined),
  };
};
