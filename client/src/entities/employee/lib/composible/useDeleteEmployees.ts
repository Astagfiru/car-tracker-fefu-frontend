import { Ref } from "vue";
import { useFetch } from "@/shared";
import { DeleteEmployeeParams, DeleteEmployeeResponse } from "../../types/apiTypes";
import { deleteEmployee } from "../../api/deleteEmployee";
import { useGetAllEmployee } from "./useGetAllEmployee";
import { getAllEmployee } from "../../api/getAllEmployee";

interface UseDeleteEmployeeReturn {
  responseData: Ref<DeleteEmployeeResponse | null>;
  error: Ref<unknown | null>;
  isLoading: Ref<boolean>;
  deleteEmployee: (params: number) => Promise<void>;
}

export const useDeleteEmployee = (): UseDeleteEmployeeReturn => {
  const { responseData, error, isLoading, sendRequest } = useFetch<
    DeleteEmployeeResponse,
    number
  >(deleteEmployee);

  const { refetch } = useGetAllEmployee()

    const wrappedDeleteEmployee = async (params: number) => {
      await sendRequest(params);
      const data = await getAllEmployee()
  
      console.log('Сотрудники после удаления', data)
      
      refetch();
    };

  return {
    responseData,
    error,
    isLoading,
    deleteEmployee: wrappedDeleteEmployee,
  };
};