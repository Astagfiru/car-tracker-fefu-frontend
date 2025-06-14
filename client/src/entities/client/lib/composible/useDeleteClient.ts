import { Ref } from "vue";
import { useFetch } from "@/shared";
import { DeleteClientResponse } from "../../types/apiTypes";
import { deleteClient } from "../../api/deleteClient";
import { useGetAllClients } from "./useGetAllClients";
import { getAllClients } from '../../api/getAllClients';

interface UseDeleteClientReturn {
  responseData: Ref<DeleteClientResponse | null>;
  error: Ref<unknown | null>;
  isLoading: Ref<boolean>;
  deleteClient: (params: number) => Promise<void>;
}

export const useDeleteClient = (): UseDeleteClientReturn => {
  const { responseData, error, isLoading, sendRequest } = useFetch<
    DeleteClientResponse,
    number
  >(deleteClient);

  const { refetch } = useGetAllClients(); 

  const wrappedDeleteClient = async (params: number) => {
    await sendRequest(params);
    const data = await getAllClients()

    console.log('Клиенты после удаления', data)
    
    refetch();
  };

  return {
    responseData,
    error,
    isLoading,
    deleteClient: wrappedDeleteClient,
  };
};