import { watch, Ref } from "vue";
import { useEmployeeStore } from "../model/employeeStore";
import { useFetch } from "@/shared";
import { getAllEmployeeRoles } from "../../api/getAllEmployeeRoles";

interface EmployeeRoleResponse {
    id: number;
    name: 'Администратор' | 'Бухгалтер';
    level_of_access: number;
}

interface getAllEmployeeRoleReturn {
  employeeRoleResponse: Ref<EmployeeRoleResponse[] | null>;
  error: Ref<unknown | null>;
  isLoading: Ref<boolean>;
  refetch: () => void;
}

const mockedRoles : EmployeeRoleResponse[] = [
    { id: 1, name: 'Администратор', level_of_access: 1 },
    { id: 2, name: 'Бухгалтер', level_of_access: 2 },
]

export const useGetAllEmployeeRole = (): getAllEmployeeRoleReturn => {
  const { responseData, error, isLoading, sendRequest } =
    useFetch<EmployeeRoleResponse[]>(getAllEmployeeRoles);

  const employeeStore = useEmployeeStore();

  const { saveAllEmployeeRoles } = employeeStore;

  const sendWrappedRequest = async () => {
    await sendRequest();
    if (responseData.value) {

      // saveAllEmployeeRoles([...responseData.value]);
      saveAllEmployeeRoles(mockedRoles); // Используем мокированные данные для тестирования
    }
  };

  watch(responseData, () => {
    if (responseData.value) {

     // saveAllEmployeeRoles([...responseData.value]);
           saveAllEmployeeRoles(mockedRoles); // Используем мокированные данные для тестирования

    }
  });

  sendRequest();

  return {
    employeeRoleResponse: responseData,
    error,
    isLoading,
    refetch: () => sendRequest(undefined),
  };
};
