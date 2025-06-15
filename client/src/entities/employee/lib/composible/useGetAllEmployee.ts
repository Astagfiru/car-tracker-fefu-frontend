import { EmployeeResponse, EmployeeType } from "../../types/employeeTypes";
import { ref, watch, Ref } from "vue";
import { useEmployeeStore } from "../model/employeeStore";
import { useFetch } from "@/shared";
import { getAllEmployee } from "../../api/getAllEmployee";
import { mapEmployeesResponseToUi } from "../mappers";

interface getAllEmployeeReturn {
  employeeResponse: Ref<EmployeeType[] | null>;
  error: Ref<unknown | null>;
  isLoading: Ref<boolean>;
  refetch: () => void;
}

export const useGetAllEmployee = (): getAllEmployeeReturn => {
  const { responseData, error, isLoading, sendRequest } =
    useFetch<EmployeeResponse[]>(getAllEmployee);

  const mappedEmployees = ref<EmployeeType[]>([]);

  const employeeStore = useEmployeeStore();

  const { saveAllEmployees } = employeeStore;

  const sendWrappedRequest = async () => {
    await sendRequest();
    if (responseData.value) {
      const mapped = mapEmployeesResponseToUi(responseData.value);
      mappedEmployees.value = mapped;

      saveAllEmployees([...mappedEmployees.value]);
    }
  };

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
