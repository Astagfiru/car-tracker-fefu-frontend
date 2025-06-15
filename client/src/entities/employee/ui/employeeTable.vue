<template>
  <BaseTable :tableHeader="TABLE_HEADERS" :tableItems="tableItems" :tableTitle="tableTitle" :isLoading="isLoading"
    :totalItems="totalItems" :itemsPerPage="itemsPerPage" @rowClick="openModalView">
    <template #edit="{ item }">
      <Edit @click.stop @click="openEditDialog(item as EmployeeType)" />
    </template>
    <template #delete="{ item }">
      <Trash @click.stop @click="openDeleteDialog(item as EmployeeType)" />
    </template>
  </BaseTable>
  <EmployeeViewForm v-if="isViewEmployeeOpen" v-model="isViewEmployeeOpen" :employeeData="selectedItem"
    title="Просмотр сотрудника" />
  <EmployeeDeleteConfirmForm :employee="selectedItem" v-model="isDeleteEmployeeOpen"
    @update:modelValue="isDeleteEmployeeOpen = $event" @delete="deleteEmployee" />
  <EmployeeEditForm v-if="isEditEmployeeOpen" :employeeData="selectedItem" :title="'Редактирование сотрудника'"
    :modelValue="isEditEmployeeOpen" @update:modelValue="isEditEmployeeOpen = $event" @save="handleEditSave"
    @delete="handleDelete" />
</template>
<script setup lang="ts">
import { ref } from "vue";
import { BaseTable } from "@/shared";
import EmployeeViewForm from "./employeeViewForm.vue";
import { EmployeerTable } from "@/widgets/employeerTable/types/types";
import { TABLE_HEADERS } from "../types/tableConfig";
import { EmployeeType } from "../types/employeeTypes";
import { Edit } from "@/shared";
import { Trash } from "@/shared";
import EmployeeDeleteConfirmForm from "./employeeDeleteConfirmForm.vue";
import EmployeeEditForm from "./employeeEditForm.vue";
import { deleteEmployee } from "../api/deleteEmployee";

export interface Props {
  tableItems: EmployeerTable[];
  tableTitle: string;
  totalItems?: number;
  itemsPerPage?: number;
  isLoading?: boolean;
  originEmployees?: EmployeeType[];
}

const props = withDefaults(defineProps<Props>(), {
  totalItems: 0,
  itemsPerPage: 5,
});

const emit = defineEmits(["confirm"]);

const isViewEmployeeOpen = ref(false);
const isDeleteEmployeeOpen = ref(false);
const isEditEmployeeOpen = ref(false);

const selectedItem = ref<EmployeerTable | null>(null);

const deleteClient = (deletedClient: EmployeeType) => {
  isDeleteEmployeeOpen.value = false;
};

const openDeleteDialog = (client: EmployeeType) => {
  selectedItem.value = client;
  isDeleteEmployeeOpen.value = true;
};

const openEditDialog = (client: EmployeeType) => {
  selectedItem.value = client;
  isEditEmployeeOpen.value = true;
}

const openModalView = (item: EmployeeType) => {

  if (!props.originEmployees) return;

  selectedItem.value = item;
  isViewEmployeeOpen.value = true;
  console.log(selectedItem.value)
};

const handleEditSave = (updatedClient: EmployeeType) => {
  isEditEmployeeOpen.value = false;
};

const handleDelete = (client: EmployeeType) => {
  isEditEmployeeOpen.value = false;
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
