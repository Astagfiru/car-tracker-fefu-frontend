import { defineStore } from "pinia";
import { onMounted, reactive, toRefs } from "vue";
import type { ClientType } from "../types";

const CLENT_STORE_NAME = "clientStore";

interface ClientStore {
  clients: ClientType[] | null;
}

const clientStoreInitialState: ClientStore = {
  clients: null,
};

export const useClientStore = defineStore(CLENT_STORE_NAME, () => {
  const state = reactive<ClientStore>({ ...clientStoreInitialState });

  function setClients(newClients: ClientType[]) {
    state.clients = newClients;
  }

  function clearClients() {
    state.clients = null;
  }


  return {
    ...toRefs(state),
    setClients,
    clearClients,
  };
});
