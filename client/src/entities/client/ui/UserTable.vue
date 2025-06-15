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

<style scoped lang="scss">
:deep(.view__container) {
  display: flex;
  flex-direction: column;
  padding: 24px;
  background: #fff;
  border-radius: 20px;
}

:deep(strong) {
  font-size: 1.2em;
  color: #5c5c5c;
}

:deep(.view__header) {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  .title {
    font-size: 24px;
    font-weight: 600;
  }

  .data__current {
    font-size: 14px;
    color: #888;
  }
}

:deep(.view__body) {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;

  .view__row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    padding: 8px 0;

    .label {
      flex: 0 0 180px;
      color: #888;
      font-weight: 500;
      text-align: left;
    }
    .value {
      flex: 1 1 auto;
      text-align: right;
      color: #222;
      font-size: 1.1em;
      word-break: break-word;
    }
    .user_name {
      color: #4E79D6;
      font-weight: 600;
      font-size: 1.3em;
    }
  }
}

:deep(.view__footer) {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
</style>