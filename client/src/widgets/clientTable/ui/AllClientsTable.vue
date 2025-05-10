<template>
  <div class="client-page">
    <div class="header">
      <h1>Управление клиентами</h1>
      <ButtonConfirm
        :onClick="redirect"
        title="Добавить клиента"
        :disabled="false"
      >
        <template #icon>
          <Plus />
        </template>
      </ButtonConfirm>
    </div>
    <BaseTable
      :key="mappedClients?.length"
      :tableHeader="TABLE_HEADERS"
      :tableItems="mappedClients"
      table-title="Клиенты"
    />
  </div>
</template>

<script setup lang="ts">
import { BaseTable, ButtonConfirm, Plus } from "@/shared";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { TABLE_HEADERS } from "../types/config";
import { ClientType, useClientStore } from "@/entities/client";
import { useGetAllClients } from "../../../entities/client";
import { onMounted, computed, watch } from 'vue';
import { ClientTableView } from '../types/types';

const router = useRouter();

const clientStore = useClientStore();

const { clients } = storeToRefs(clientStore);
const { saveAllClients } = clientStore;

const redirect = () => {
  router.push({ name: "add-client" });
};

const getAllClients = async () => {
  try {
    const fetchedClients = await useGetAllClients();

    if (fetchedClients && Array.isArray(fetchedClients)) {
      saveAllClients(fetchedClients);
    }
  } catch (error) {
    throw error
  }
};

watch(() => clients, getAllClients)

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
  }
}

const mapClientsToTableView = (clients: ClientType[]): ClientTableView[] => {
  return clients.map(mapClientToTableView)
}

const mappedClients = computed((): ClientTableView[] | null => {
  if(!clients.value) {
    return null
  }

   return mapClientsToTableView(clients.value)
})
</script>

<style scoped lang="scss">
.client-page {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 32px;
  background-color: white;
  min-height: 100vh;
  width: 80%;
  box-sizing: border-box;
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
</style>
