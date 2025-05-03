import { defineStore } from "pinia";
import { onMounted, reactive, toRefs } from "vue";
import { createClient, fetchClients } from "@/entities/client/index";
import type { ClientType, NewClient } from "@/entities/client/index";

const CLENT_STORE_NAME = "clientStore";

interface ClientStore {
  clients: NewClient[] | null;
  newClient: NewClient | null;
  isLoading: boolean;
  errorMessage: string | null;
}

const clientStoreInitialState: ClientStore = {
  clients: [
    {
      secondName: "Тестов",
      firstName: "Тест",
      patronymic: "Тестович",
      phoneNumber: "+7 (999) 999-99-99",
      email: "test@example.com",
      passportSeries: "1234",
      passportNumber: "567890",
      issuedBy: "ОВД г. Тест",
      dateOfIssue: "2020-01-01",
    }
  ],
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

  const clearClient = () => {
    state.clients = [];
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

  return {
    ...toRefs(state),
    setClients,
    clearClient,
    getAllClients,
    createNewClient,
  };
});
