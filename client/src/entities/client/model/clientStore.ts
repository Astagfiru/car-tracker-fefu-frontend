import { defineStore } from "pinia";
import { onMounted, reactive, toRefs } from "vue";
import { createClient, fetchClients } from "@/entities/client/index";
import type { ClientType } from "@/entities/client/index";

const CLENT_STORE_NAME = "clientStore";

interface ClientStore {
  clients: ClientType[] | null;
  newClient: ClientType | null;
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
  const state = reactive<ClientStore>({ ...clientStoreInitialState });

  const { clients, isLoading, errorMessage } = toRefs(state);

  const setClients = (newClients: ClientType[]) => {
    state.clients = newClients;
  };

  const clearClients = () => {
    state.clients = null;
  };

  const getAllClients = async (): Promise<ClientType[]> => {
    isLoading.value = true;
    try {
      const response = await fetchClients();
      clients.value = response;
      return response;
    } catch (error) {
      errorMessage.value = "Ошибка при получении клиентов";
      throw new Error(error);
    } finally {
      isLoading.value = false;
    }
  };

  const createNewClient = async (newClientData: ClientType): Promise<void> => {
    isLoading.value = true;
    try {
      await createClient(newClientData);
      getAllClients();
    } catch (error) {
      errorMessage.value = "Ошибка при создании клиента";
      console.error("Ошибка при отправке нового клиента", error);
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(() => {
    getAllClients();
  });

  return {
    ...toRefs(state),
    setClients,
    clearClients,
    getAllClients,
    createNewClient,
  };
});
