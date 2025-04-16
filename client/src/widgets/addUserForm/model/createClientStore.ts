import { defineStore } from "pinia";
import { onMounted, reactive, toRefs } from "vue";
import type { ClientType } from "@/entities/client";

const NEW_CLENT_STORE_NAME = "clientStore";

interface newClientStore {
  newClient: ClientType | null;
}

const clientStoreInitialState: newClientStore = {
  newClient: null,
};

export const useCreateClientStore = defineStore(NEW_CLENT_STORE_NAME, () => {
  const state = reactive<newClientStore>({ ...clientStoreInitialState });

  return {
    ...toRefs(state),
  };
});
