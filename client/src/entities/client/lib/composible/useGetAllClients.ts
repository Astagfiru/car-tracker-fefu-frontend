import {
  ClientResponse,
  Client,
} from "./../../types/clientTypes";
import { ref, watch, Ref, onMounted } from "vue";
import { useClientStore } from "../model/clientStore";
import { useFetch } from "@/shared";
import { getAllClients } from "../../api/getAllClients";
import { mapClientsResponceToUi } from "../mappers";

interface GetAllClientsReturn {
  clientsResponse: Ref<Client[] | null>,
  error: Ref<unknown | null>,
  isLoading: Ref<boolean>,
  refetch: () => void,
}

export const useGetAllClients =  (): GetAllClientsReturn => {
  const { responseData, error, isLoading, sendRequest } =
    useFetch<ClientResponse[]>(getAllClients);

  const mappedClients = ref<Client[]>([]);

  const clientStore = useClientStore();

  const { saveAllClients } = clientStore;

  watch(responseData, () => {
    
    if (responseData.value) {
      mappedClients.value = mapClientsResponceToUi(responseData.value);

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
