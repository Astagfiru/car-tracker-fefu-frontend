import { ClientRequest, ClientForm } from "./../../types/clientTypes";
import { ref, watch, Ref } from "vue";
import { useClientStore } from "../model/clientStore";
import { useFetch } from "@/shared";
import { addClient } from '../../api/addNewClient';
import { mapClientUiToApi } from "../mappers";
import { AddClientResponce } from "../../types/apiTypes";

interface AddClientReturn {
  error: Ref<unknown | null>;
  isLoading: Ref<boolean>;
  addClient: () => void;
}

export const useAddClient = (newClient: ClientForm): AddClientReturn => {
  const { responseData, error, isLoading, sendRequest } = useFetch<AddClientResponce, ClientRequest>(addClient);

  const clientStore = useClientStore();

  const mappedClient = ref<ClientRequest>();

  const refetch = async () => {
    try {
      const mappedClient = mapClientUiToApi(newClient);
      console.log('Mapped client data:', mappedClient);
      
      await sendRequest(mappedClient);

       clientStore.addClient({
        id: Number(Date.now()),
        ...newClient
    });
      
      if (responseData.value) {
        clientStore.addClient({
          id: Number(Date.now()),
          ...newClient
        });
      }
    } catch (err) {
      console.error("Error adding client:", err);
      throw err;
    }
  };


  watch(responseData, () => {
    if (responseData.value) {
    console.log('addClient', )
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
    addClient: refetch,
  };
};
