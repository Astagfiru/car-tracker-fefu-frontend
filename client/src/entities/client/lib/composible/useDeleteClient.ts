import { Ref } from "vue";
import { useFetch } from "@/shared";
import { DeleteClientResponse, DeleteClientParams } from "../../types/apiTypes";
import { deleteClient } from "../../api/deleteClient";

interface UseDeleteClientReturn {
  responseData: Ref<DeleteClientResponse | null>;
  error: Ref<unknown | null>;
  isLoading: Ref<boolean>;
  deleteClient: (params: DeleteClientParams) => Promise<void>;
}

export const useDeleteClient = (): UseDeleteClientReturn => {
  const { responseData, error, isLoading, sendRequest } = useFetch<
    DeleteClientResponse,
    DeleteClientParams
  >(deleteClient);

  return {
    responseData,
    error,
    isLoading,
    deleteClient: sendRequest,
  };
};