import { ClientRequest, ClientForm } from "./../../types/clientTypes";
import { ref, watch, Ref } from "vue";
import { useClientStore } from "../model/clientStore";
import { useFetch } from "@/shared";
import { addClient } from '../../api/addNewClient';
import { mapClientUiToApi } from "../mappers";
import { AddClientResponce } from "../../types/apiTypes";
import { useGetAllClients } from "./useGetAllClients";

interface AddClientReturn {
  error: Ref<unknown | null>;
  isLoading: Ref<boolean>;
  addClient: () => void;
}

export const useAddClient = (newClient: ClientForm): AddClientReturn => {
  const { responseData, error, isLoading, sendRequest } = useFetch<AddClientResponce, ClientRequest>(addClient);

  const clientStore = useClientStore();

  const mappedClient = ref<ClientRequest>();

  const { refetch } = useGetAllClients();

  const refetchAndUpdate = async () => {
    try {
      const mappedClient = mapClientUiToApi(newClient);
      console.log('Mapped client data:', mappedClient);

      await sendRequest(mappedClient);

      if (responseData.value) {
        await refetch();
      }
    } catch (err) {
      console.error("Error adding client:", err);
      throw err;
    }
  };

  watch(responseData, () => {
    if (responseData.value) {
      console.log('addClient');
      mappedClient.value = mapClientUiToApi(newClient);
    }
  });

  return {
    error,
    isLoading,
    addClient: refetchAndUpdate,
  };
};