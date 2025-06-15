<template>
  <div class="container">
    <Title title="Клиенты " />
    <div class="client-page">
      <div class="content">
        <div class="header">
          <AllClientsTableToolbar v-model:filteredClients="filteredClients" :origin-clients="clients" />
        </div>
        <UserTable :key="filteredClients.length" :tableItems="paginatedClients" table-title="Таблица с клиентами"
          :is-loading="false" :totalItems="clients?.length" :originClients="clients || []" />
        <Pagination v-model:elements="paginatedClients" v-model:originalList="filteredClients"
          v-model:currentPage="currentPage" :totalItemslenght="filteredClients.length" :items-per-page="5" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Client } from '@/entities/client';
import { ref, watch } from 'vue';
import { Pagination } from '@/widgets';
import AllClientsTableToolbar from './AllClientsTableToolbar.vue';
import { ClientTableView } from '../types/types';
import UserTable from '@/entities/client/ui/UserTable.vue';
import { useClientStore } from '@/entities/client';
import { storeToRefs } from 'pinia';
import { Title } from '@/shared';

const clientStore = useClientStore();
const { clients } = storeToRefs(clientStore);

const currentPage = ref<number>(1);
const filteredClients = ref<Client[]>(clients.value || []);

const paginatedClients = ref<ClientTableView[]>([]);

watch(clients, (client) => {
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
  width: 100%;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
}

.content {
  width: 100%;
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

.container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
</style>
