import { EmployeeType, EmployeeResponse } from "../../types/employeeTypes";
import {  Ref } from "vue";
import { useGetAllEmployee } from "./useGetAllEmployee";
import { useFetch } from "@/shared";
import { updateEmployee } from "../../api/updateEmployee";
import { UpdateEmployeeResponse } from "../../types/apiTypes";
import { mapEmployeeUiToApi } from "../mappers";

interface UpdateEmployeeReturn {
  responseData: Ref<UpdateEmployeeResponse | null>;
  error: Ref<unknown | null>;
  isLoading: Ref<boolean>;
  updateEmployee: (params: EmployeeType) => Promise<void>;
}

export const useUpdateEmployee = (): UpdateEmployeeReturn => {
  const { responseData, error, isLoading, sendRequest } = useFetch<
    UpdateEmployeeResponse,
    EmployeeResponse
  >(updateEmployee);

  const { refetch } = useGetAllEmployee(); 

  const wrappedUpdateEmployee = async (params: EmployeeType) => {
    console.log('Обновление сотрудника с данными:', params);

    const mappedEmployee = mapEmployeeUiToApi(params);

    await sendRequest({
        id: params.id,
        ...mappedEmployee,
        user_id: params.user_id
    });
    
    refetch();
  };

  return {
    responseData,
    error,
    isLoading,
    updateEmployee: wrappedUpdateEmployee,
  };
};