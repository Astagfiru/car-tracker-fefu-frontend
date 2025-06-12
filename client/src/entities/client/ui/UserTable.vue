<template>
  <v-container>
    <BaseTable
      :tableHeader="TABLE_HEADERS"
      :tableItems="tableItems"
      :tableTitle="tableTitle"
      :isLoading="isLoading"
      :totalItems="totalItems"
      :itemsPerPage="itemsPerPage"
      @rowClick="openModal"
    />
    <UserViewForm
      v-if="dialog"
      v-model="dialog"
      :clientData="selectedItem"
      title="Просмотр клиента"
      @confirm="handleConfirm"
    />
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { BaseTable } from "@/shared";
import UserViewForm from "@/entities/client/ui/UserViewForm.vue";
import { ClientTableView } from "@/widgets/clientTable/types/types";
import { TABLE_HEADERS } from "../types/tableConfig";
import { Client } from "../types/clientTypes";

export interface Props {
  tableItems: ClientTableView[];
  tableTitle: string;
  totalItems?: number;
  itemsPerPage?: number;
  isLoading?: boolean;
  originClients?: Client[];
}

const props = withDefaults(defineProps<Props>(), {
  totalItems: 0,
  itemsPerPage: 5,
});

const dialog = ref(false);
const selectedItem = ref<Client | null>(null);

const handleConfirm = () => {
};

const openModal = (item: Client) => {
  
  if(!props.originClients) return;

  const fullItem = props.originClients.find(client => client.id === item.id);
  selectedItem.value = fullItem || null;
  dialog.value = true;
  console.log(selectedItem.value)
};
</script>

<style scoped>
.title {
  background-color: #ffffff !important;
  border-radius: 8px 8px 0 0;
  margin-bottom: 16px;
}

.styled-table >>> .v-data-table-header th {
  font-weight: 600;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.styled-table >>> .v-data-table {
  border-radius: 5px;
  overflow: hidden;
  border: 1px solid #cfcfcf;
}

.styled-table >>> .v-data-table__wrapper {
  background-color: #fff;
}

.styled-table >>> .v-data-table td {
  font-size: 14px;
  color: #333;
  cursor: pointer;
}

.styled-table >>> .v-data-table tr:hover {
  background-color: #f5f5f5 !important;
}

.v-data-table-header__sort-icon {
  svg {
    color: black;
  }
}
</style>
