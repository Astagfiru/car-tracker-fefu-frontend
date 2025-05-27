<template>
  <div class="client-page">
    <div class="header">
      <AllClientsTableToolbar v-model:clients="filteredClients" :origin-clients="clients"/>
    </div>
    <BaseTable :key="filteredClients.length" :tableHeader="TABLE_HEADERS" :tableItems="filteredClients"
      table-title="Клиенты" />
    <Pagination v-model:elements="filteredClients" :items-per-page="5" :current-page="1" ref="pagination" />
  </div>
</template>

<script setup lang="ts">
import { BaseTable } from "@/shared";
import { storeToRefs } from "pinia";
import { TABLE_HEADERS } from "../types/config";
import { ClientType, useClientStore } from "@/entities/client";
import { useGetAllClients } from "../../../entities/client";
import { onMounted, computed, watch, ref } from "vue";
import { ClientTableView } from "../types/types";
import { Pagination } from "@/widgets";
import AllClientsTableToolbar from "./AllClientsTableToolbar.vue";

const clientStore = useClientStore();
const { clients } = storeToRefs(clientStore);

const filteredClients = ref<ClientType[]>([]);

watch(clients, (newClients) => {
  if (newClients) {
    filteredClients.value = [...newClients];
  } else {
    filteredClients.value = [];
  }
}, { immediate: true });

const { saveAllClients } = clientStore;

const getAllClients = async () => {
  try {
    const fetchedClients = await useGetAllClients();

    if (fetchedClients) {
      saveAllClients(fetchedClients);
    }
  } catch (error) {
    throw error;
  }
};

onMounted(() => {
  getAllClients();
});

const mapClientToTableView = (client: ClientType): ClientTableView => {
  return {
    secondName: client.secondName,
    firstName: client.firstName,
    patronymic: client.patronymic,
    phoneNumber: client.phoneNumber,
    email: client.email,
  };
};

const mapClientsToTableView = (clients: ClientType[]): ClientTableView[] => {
  return clients.map(mapClientToTableView);
};

const mappedClients = computed(() => {
  return mapClientsToTableView(filteredClients.value);
});
</script>

<style scoped lang="scss">
.client-page {
  display: flex;
  flex-direction: column;
  min-height: 70vh;
  width: 80%;
  box-sizing: border-box;
  margin-top: 30px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header h1 {
  font-size: 32px;
  font-weight: 700;
  margin: 0;
}

.btn {
  margin-left: 17px;
}
</style>
