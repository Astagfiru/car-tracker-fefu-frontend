import {
  ClientRequest,
  ClientResponse,
  Client,
} from "./../../types/clientTypes";
import { ref, watchEffect } from "vue";
import { useClientStore } from "../model/clientStore";
import { useFetch } from "@/shared";
import { getAllClients } from "../../api/getAllClients";
import { mapClientsResponceToApi } from "../mappers";

export const useGetAllClients = () => {
  const { responseData, error, isLoading, sendRequest } =
    useFetch<ClientResponse[]>(getAllClients);

  const mappedClients = ref<Client[]>([]);

  const clientStore = useClientStore();

  const { saveAllClients } = clientStore;

  watchEffect(() => {
    if (responseData.value) {
      mappedClients.value = mapClientsResponceToApi(responseData.value);

      saveAllClients(mappedClients.value);
    }
  });
  sendRequest();

  return {
    clientsResponse: mappedClients,
    error,
    isLoading,
    refetch: () => sendRequest(undefined),
  };
};
