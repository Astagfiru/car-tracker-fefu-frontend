import { defineStore } from "pinia";
import { onMounted, reactive, toRefs } from "vue";
import { fetchAllClients } from "../api/useGetAllClients";
import type { ClientType, NewClient } from "@/entities/client/index";

const CLENT_STORE_NAME = "clientStore";

interface ClientStore {
  clients: ClientType[] | null;
  newClient: NewClient | null;
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

  const saveAllClients = (newClients: ClientType[]) => {
    clients.value = newClients;
  };

  onMounted(() => {
    fetchAllClients()
  })
  return {
    ...toRefs(clientStoreState),
    saveAllClients,
  };
});
