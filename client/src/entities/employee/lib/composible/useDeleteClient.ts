import { Ref } from "vue";
import { useFetch } from "@/shared";
import { DeleteEmployeeParams, DeleteEmployeeResponse } from "../../types/apiTypes";
import { deleteEmployee } from "../../api/deleteEmployee";

interface UseDeleteEmployeeReturn {
  responseData: Ref<DeleteEmployeeResponse | null>;
  error: Ref<unknown | null>;
  isLoading: Ref<boolean>;
  deleteEmployee: (params: DeleteEmployeeParams) => Promise<void>;
}

export const useDeleteEmployee = (): UseDeleteEmployeeReturn => {
  const { responseData, error, isLoading, sendRequest } = useFetch<
    DeleteEmployeeResponse,
    DeleteEmployeeParams
  >(deleteEmployee);

  return {
    responseData,
    error,
    isLoading,
    deleteEmployee: sendRequest,
  };
};