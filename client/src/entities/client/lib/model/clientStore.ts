import { defineStore } from "pinia";
import { reactive, toRefs } from "vue";
import type { Client, ClientForm } from "@/entities/client/index";

const CLENT_STORE_NAME = "clientStore";

interface ClientStore {
  clients: Client[] | null;
  newClient: ClientForm | null;
  isLoading: boolean;
  errorMessage: string | null;
}

const clientStoreInitialState: ClientStore = {
  clients: null,
  newClient: null,
  isLoading: false,
  errorMessage: null,
};

export const useClientStore = defineStore(CLENT_STORE_NAME, () => {
  
  const clientStoreState = reactive<ClientStore>({
    ...clientStoreInitialState,
  });

  const { clients } = toRefs(clientStoreState);

  const saveAllClients = (newClients: Client[]): void => {
    clients.value = newClients;
  };

  const addClient = (newClients: Client) => {
    clients.value?.unshift(newClients)
  }

  return {
    ...toRefs(clientStoreState),
    saveAllClients,
    addClient
  };
});
