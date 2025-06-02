<template>
  <div class="client-page">
    <div class="header">
      <AllClientsTableToolbar v-model:clients="filteredClients" :origin-clients="clientsResponse"/>
    </div>
    <BaseTable :key="filteredClients.length" :tableHeader="TABLE_HEADERS" :tableItems="mappedClients"
      table-title="Клиенты" :is-loading="isLoading"/>
    <Pagination v-model:elements="filteredClients" :items-per-page="5" :current-page="1" ref="pagination" />
  </div>
</template>

<script setup lang="ts">
import { BaseTable } from '@/shared';
import { TABLE_HEADERS } from "../types/config";
import { Client, } from "@/entities/client";
import { useGetAllClients } from "../../../entities/client";
import { computed, ref } from "vue";
import { ClientTableView } from "../types/types";
import { Pagination } from "@/widgets";
import AllClientsTableToolbar from "./AllClientsTableToolbar.vue";

const filteredClients = ref<Client[]>([]);

const { clientsResponse, isLoading} = useGetAllClients()

const mapClientToTableView = (client: Client): ClientTableView => {
  return {
    secondName: client.secondName,
    firstName: client.firstName,
    patronymic: client.patronymic,
    phoneNumber: client.phoneNumber,
    email: client.email,
  };
};

const mapClientsToTableView = (clients: Client[]): ClientTableView[] => {
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
