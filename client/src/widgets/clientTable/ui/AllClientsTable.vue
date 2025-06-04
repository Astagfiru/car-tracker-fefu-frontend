<template>
  <div class="client-page">
    <div class="header">
      <AllClientsTableToolbar
        v-model:clients="filteredClients"
        :origin-clients="clientsResponse"
      />
    </div>
    <UserTable
      :key="paginatedClients.length"
      :tableItems="paginatedClients"
      table-title="Клиенты"
      :is-loading="isLoading"
      :totalItems="clientsResponse?.length"
    />
    <Pagination
      v-model:elements="paginatedClients"
      v-model:originalList="filteredClients"
      v-model:currentPage="currentPage"
      :items-per-page="5"
    />
  </div>
</template>

<script setup lang="ts">
import { BaseTable } from '@/shared';
import { TABLE_HEADERS } from '../types/config';
import { Client } from '@/entities/client';
import { useGetAllClients } from '../../../entities/client';
import { ref, watch } from 'vue';
import { Pagination } from '@/widgets';
import AllClientsTableToolbar from './AllClientsTableToolbar.vue';
import { ClientTableView } from '../types/types';
import UserTable from '@/entities/client/ui/UserTable.vue';

const { clientsResponse, isLoading } = useGetAllClients();

const currentPage = ref<number>(1);
const filteredClients = ref<Client[]>([]);

const paginatedClients = ref<ClientTableView[]>([]);

const mapClientToTableView = (client: Client): ClientTableView => ({
  secondName: client.secondName,
  firstName: client.firstName,
  patronymic: client.patronymic,
  phoneNumber: client.phoneNumber,
  email: client.email,
});

watch(clientsResponse, (clients) => {
  if (clients) {
    filteredClients.value = clients;
  }
}, { immediate: true });

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
