<template>
  <div class="client-page">
    <div class="header">
      <AllClientsTableToolbar
        v-model:filteredClients="filteredClients"
        :origin-clients="clients"
      />
    </div>
    <UserTable
      :key="filteredClients.length"
      :tableItems="paginatedClients"
      table-title="Клиенты"
      :is-loading="isLoading"
      :totalItems="clients?.length"
      :originClients="clients || []"
    />
    <Pagination
      v-model:elements="paginatedClients"
      v-model:originalList="filteredClients"
      v-model:currentPage="currentPage"
      :totalItemslenght="filteredClients.length"
      :items-per-page="5"
    />
  </div>
</template>

<script setup lang="ts">
import { Client } from '@/entities/client';
import { useGetAllClients } from '../../../entities/client';
import { ref, watch, toRefs } from 'vue';
import { Pagination } from '@/widgets';
import AllClientsTableToolbar from './AllClientsTableToolbar.vue';
import { ClientTableView } from '../types/types';
import UserTable from '@/entities/client/ui/UserTable.vue';
import { useClientStore } from '@/entities/client';
import { storeToRefs } from 'pinia';

const clientStore = useClientStore();
const { clients } = storeToRefs(clientStore);

const { clientsResponse, isLoading } = useGetAllClients();

const currentPage = ref<number>(1);
const filteredClients = ref<Client[]>(clients.value || []);

const paginatedClients = ref<ClientTableView[]>([]);

watch(clientsResponse, (client) => {
  if (client) {
    filteredClients.value = [...client];
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
