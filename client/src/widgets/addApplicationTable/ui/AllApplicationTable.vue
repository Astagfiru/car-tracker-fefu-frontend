<template>
  <div class="client-page">
    <div class="header">
      <TableToolbar
        add-button-title="Добавить заяыку"
        :add-redirect="redirect"
      />
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
import { BaseTable } from "@/shared";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { TABLE_HEADERS } from "../types/config";
import { Client, useClientStore } from "@/entities/client";
import { useGetAllClients } from "../../../entities/client";
import { onMounted, computed, watch } from "vue";
import { ClientTableView } from "../types/types";
import { TableToolbar } from "@/shared";
const router = useRouter();

const clientStore = useClientStore();

const { clients } = storeToRefs(clientStore);
const { saveAllClients } = clientStore;

const redirect = () => {
  router.push({ name: "clients-add" });
};

// const getAllClients = async () => {
//   try {
//     const fetchedClients = await useGetAllClients();

//     if (fetchedClients) {
//       saveAllClients(fetchedClients);
//     }
//   } catch (error) {
//     throw error;
//   }
// };

// watch(() => clients, getAllClients);

// onMounted(() => {
//   getAllClients();
// });

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

const mappedClients = computed((): ClientTableView[] | null => {
  if (!clients.value) {
    return null;
  }

  return mapClientsToTableView(clients.value);
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
