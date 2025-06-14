import {  Client, ClientResponse } from "./../../types/clientTypes";
import {  Ref } from "vue";
import { useGetAllClients } from "./useGetAllClients";
import { useFetch } from "@/shared";
import { updateClient } from '../../api/updateClient';
import { UpdateClientResponse } from "../../types/apiTypes";
import { mapClientUiToApi } from "../mappers";

interface UseUpdateClientReturn {
  responseData: Ref<UpdateClientResponse | null>;
  error: Ref<unknown | null>;
  isLoading: Ref<boolean>;
  updateClient: (params: Client) => Promise<void>;
}

export const useUpdateClient = (): UseUpdateClientReturn => {
  const { responseData, error, isLoading, sendRequest } = useFetch<
    UpdateClientResponse,
    ClientResponse
  >(updateClient);

  const { refetch } = useGetAllClients(); 

  const wrappedUpdateClient = async (params: Client) => {
    console.log('Обновление клиента с данными:', params);

    const mappedClient = mapClientUiToApi(params);
    await sendRequest({
        id: params.id,
        ...mappedClient
    });
    
    refetch();
  };

  return {
    responseData,
    error,
    isLoading,
    updateClient: wrappedUpdateClient,
  };
};