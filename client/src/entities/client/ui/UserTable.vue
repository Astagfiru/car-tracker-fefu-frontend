<template>
  <BaseTable
    :tableHeader="TABLE_HEADERS"
    :tableItems="tableItems"
    :tableTitle="tableTitle"
    :isLoading="isLoading"
    :totalItems="totalItems"
    :itemsPerPage="itemsPerPage"
    @rowClick="openModalView"
  >
    <template #edit="{ item }">
      <Edit @click.stop @click="openEditDialog(item as Client)" />
    </template>
    <template #delete="{ item }">
      <Trash @click.stop @click="openDeleteDialog(item as Client)" />
    </template>
  </BaseTable>
  <UserViewForm
    v-if="isViewClietOpen"
    v-model="isViewClietOpen"
    :clientData="selectedItem"
    title="Просмотр клиента"
  />
  <UserDeleteConfirm
    :client="selectedItem"
    v-model="isDeleteClientOpen"
    @update:modelValue="isDeleteClientOpen = $event"
    @delete="deleteClient"
  />
  <UserEditForm
    v-if="isEditClientOpen"
    :clientData="selectedItem"
    :title="'Редактирование клиента'"
    :modelValue="isEditClientOpen"
    @update:modelValue="isEditClientOpen = $event"
    @save="handleEditSave"
    @delete="handleDelete"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { BaseTable } from "@/shared";
import UserViewForm from "@/entities/client/ui/UserViewForm.vue";
import { ClientTableView } from "@/widgets/clientTable/types/types";
import { TABLE_HEADERS } from "../types/tableConfig";
import { Client } from "../types/clientTypes";
import { Trash } from "@/shared";
import { Edit } from "@/shared";
import UserDeleteConfirm from "./UserDeleteConfirm.vue";
import UserEditForm from "./UserEditForm.vue";

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

const emit = defineEmits(["confirm"]);

const deleteClient = (deletedClient: Client) => {
  isDeleteClientOpen.value = false;
};

const isViewClietOpen = ref(false);
const isDeleteClientOpen = ref(false);
const isEditClientOpen = ref(false);

const selectedItem = ref<Client | null>(null);

const openDeleteDialog = (client: Client) => {
  selectedItem.value = client;
  isDeleteClientOpen.value = true;
};

const openEditDialog = (client: Client) => {
  selectedItem.value = client;
  isEditClientOpen.value = true;
}

const openModalView = (item: Client) => {
  
  if(!props.originClients) return;

  const fullItem = props.originClients.find(client => client.id === item.id);
  selectedItem.value = fullItem || null;
  isViewClietOpen.value = true;
};

const handleEditSave = (updatedClient: Client) => {
  isEditClientOpen.value = false;
};

const handleDelete = (client: Client) => {
  isEditClientOpen.value = false;
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
