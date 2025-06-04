import { ClientRequest, ClientForm } from "./../../types/clientTypes";
import { ref, watch, Ref } from "vue";
import { useClientStore } from "../model/clientStore";
import { useFetch } from "@/shared";
import { addClient } from "../../api/addNewClient";
import { mapClientUiToApi } from "../mappers";
import { AddClientResponce } from "../../types/apiTypes";

interface AddClientReturn {
  error: Ref<unknown | null>;
  isLoading: Ref<boolean>;
  refetch: () => void;
}

export const useAddClient = (newClient: ClientForm): AddClientReturn => {
  const { responseData, error, isLoading, sendRequest } = useFetch<AddClientResponce, ClientRequest>(addClient);

  const clientStore = useClientStore();

  const mappedClient = ref<ClientRequest>();

  const refetch = () => {
    if(!mappedClient.value) return

    sendRequest(mappedClient.value);
  };

  watch(responseData, () => {
    if (responseData.value) {
    
    mappedClient.value = mapClientUiToApi(newClient)

    clientStore.addClient({
        id: Number(Date.now()),
        ...newClient
    });
    }
  });

  return {
    error,
    isLoading,
    refetch,
  };
};
