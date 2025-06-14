import {
  ClientResponse,
  Client,
} from "./../../types/clientTypes";
import { ref, watch, Ref } from "vue";
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

  const sendWrappedRequest = async () => {
      await sendRequest();
    if (responseData.value) {
    const mapped = mapClientsResponceToUi(responseData.value);
    mappedClients.value = mapped;
    
    saveAllClients([...mappedClients.value]);
  }
  }

  watch(responseData, () => {
  if (responseData.value) {
    const mapped = mapClientsResponceToUi(responseData.value);
    mappedClients.value = mapped;
    saveAllClients([...mapped]);
  }
}, { immediate: true });

  sendRequest();

  return {
    clientsResponse: mappedClients,
    error,
    isLoading,
    refetch: sendWrappedRequest,
  };
};
