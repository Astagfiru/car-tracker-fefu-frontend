<template>
  <div class="client-page">
    <div class="header">
      <h1 class="page-title">Модели автомобилей</h1>
      <v-btn color="primary" class="add-btn" @click="openAddModal">
        <v-icon left>mdi-plus</v-icon>Добавить модель
      </v-btn>
    </div>
    <div class="search-bar">
      <TableToolbar
        :add-redirect="openAddModal"
        :add-button-title="'Добавить модель'"
        v-model:search-string="searchQuery"
        :clear-function="() => { searchQuery = '' }"
        hide-add-button
      />
    </div>
    <BaseTable
      :key="filteredCarModels?.length"
      :tableHeader="tableHeadersWithActions"
      :tableItems="paginatedCarModels"
      table-title="Модели авто"
      :is-loading="isLoading"
      :itemsPerPage="itemsPerPage"
      :totalItems="filteredCarModels.length"
      @rowClick="onView"
    >
      <template #edit="{ item }">
        <Edit @click.stop="onEdit(item)" class="action-icon" />
      </template>
      <template #delete="{ item }">
        <Trash @click.stop="onDelete(item)" class="action-icon" />
      </template>
    </BaseTable>
    <v-pagination
      v-model="currentPage"
      :length="pageCount"
      class="mt-4"
    />
    <BaseModalWrapper v-model="showAddModal" title="Добавить модель">
      <AddCarModelForm @submit="handleAdd" />
    </BaseModalWrapper>
    <BaseModalWrapper v-model="showViewModal" title="Просмотр модели">
      <div v-if="selectedModel">
        <div><b>Бренд:</b> {{ selectedModel.brand }}</div>
        <div><b>Модель:</b> {{ selectedModel.model }}</div>
        <div><b>Год:</b> {{ selectedModel.year }}</div>
        <div><b>Расход топлива:</b> {{ selectedModel.fuelConsumption }}</div>
        <div><b>Мест:</b> {{ selectedModel.seats }}</div>
        <div><b>Дверей:</b> {{ selectedModel.doors }}</div>
        <div><b>Доп. информация:</b> {{ selectedModel.additionalInfo }}</div>
      </div>
    </BaseModalWrapper>
    <BaseModalWrapper v-model="showEditModal" title="Редактировать модель">
      <AddCarModelForm v-if="editModel" :initial="editModel" :isEdit="true" @submit="handleEdit" />
    </BaseModalWrapper>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { BaseTable, TableToolbar, BaseModalWrapper } from "@/shared";
import AddCarModelForm from "./AddCarModelForm.vue";
import { TABLE_HEADERS } from "../config/config";
import { CarModelsTableView } from "../config/types";
import { useGetAllCarModels } from "@/entities/car/lib/composible/useGetAllModelCars";
import { useCarModelsStore } from "@/entities/car/lib/model/carModelStore";
import { addCarModel } from "@/entities/car/api/addCarModel";
import { deleteCarModel } from "@/entities/car/api/deleteCarModel";
import { updateCarModel } from '@/entities/car/api/updateCarModel';
import type { CarModelsRequest } from "@/entities/car/types/carTypes";
import Edit from '@/shared/icons/Edit.vue';
import Trash from '@/shared/icons/Trash.vue';

const showAddModal = ref(false);
const showViewModal = ref(false);
const showEditModal = ref(false);
const selectedModel = ref<CarModelsTableView | null>(null);
const editModel = ref<CarModelsTableView | null>(null);
const searchQuery = ref("");
const currentPage = ref(1);
const itemsPerPage = 5;

const { carModelsResponse, isLoading, refetch } = useGetAllCarModels();
const carModelsStore = useCarModelsStore();

const openAddModal = () => (showAddModal.value = true);
const onView = (item: CarModelsTableView) => {
  selectedModel.value = item;
  showViewModal.value = true;
};
const onDelete = async (item: CarModelsTableView) => {
  if (confirm(`Удалить модель ${item.brand} ${item.model}?`)) {
    // Найти id по модели и бренду
    const carModel = carModelsStore.carModels?.find(
      (m) => m.model === item.model && m.brand === item.brand
    );
    if (!carModel) return alert("Модель не найдена");
    const ok = await deleteCarModel(carModel.id);
    if (ok) {
      refetch && refetch();
    } else {
      alert("Ошибка при удалении модели");
    }
  }
};
const handleAdd = async (model: CarModelsTableView) => {
  // Преобразуем данные формы к CarModelsRequest
  const payload: CarModelsRequest = {
    brand: model.brand,
    model: model.model,
    year: Number(model.year),
    fuel_consumption: Number(model.fuelConsumption),
    seats: Number((model as any).seats) || 0,
    doors: Number((model as any).doors) || 0,
    addiitonal_info: (model as any).additionalInfo || "",
  };
  const res = await addCarModel(payload);
  if (res) {
    refetch && refetch();
    showAddModal.value = false;
  } else {
    alert("Ошибка при добавлении модели");
  }
};
const onEdit = (item: CarModelsTableView) => {
  editModel.value = { ...item };
  showEditModal.value = true;
};
const handleEdit = async (model: CarModelsTableView) => {
  if (!editModel.value) return;
  // Найти id по модели и бренду
  const carModel = carModelsStore.carModels?.find(
    (m) => m.model === editModel.value!.model && m.brand === editModel.value!.brand
  );
  if (!carModel) return alert('Модель не найдена');
  const payload: CarModelsRequest = {
    brand: model.brand,
    model: model.model,
    year: Number(model.year),
    fuel_consumption: Number(model.fuelConsumption),
    seats: Number((model as any).seats) || 0,
    doors: Number((model as any).doors) || 0,
    addiitonal_info: (model as any).additionalInfo || '',
  };
  const res = await updateCarModel(carModel.id, payload);
  if (res) {
    refetch && refetch();
    showEditModal.value = false;
    editModel.value = null;
  } else {
    alert('Ошибка при обновлении модели');
  }
};

const tableHeadersWithActions = computed(() => [
  ...TABLE_HEADERS,
  { title: "Действия", key: "actions", sortable: false },
]);

const filteredCarModels = computed(() => {
  if (!carModelsResponse.value) return [];
  if (!searchQuery.value) return carModelsResponse.value;
  return carModelsResponse.value.filter((m) =>
    m.model.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    m.brand.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const pageCount = computed(() =>
  Math.ceil(filteredCarModels.value.length / itemsPerPage)
);
const paginatedCarModels = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredCarModels.value.slice(start, start + itemsPerPage);
});
</script>

<style scoped lang="scss">
.client-page {
  display: flex;
  flex-direction: column;
  min-height: 70vh;
  width: 80%;
  box-sizing: border-box;
  margin: 30px auto 0 auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
}

.add-btn {
  font-weight: 600;
  font-size: 1rem;
}

.search-bar {
  margin-bottom: 18px;
  width: 100%;
}

.action-icon {
  cursor: pointer;
  transition: background 0.2s;
  border-radius: 5px;
  padding: 6px;
  &:hover {
    background: #f0f0f0;
  }
}

.search-input {
  width: 100%;
  max-width: 400px;
}

.mt-4 {
  margin-top: 24px;
}
</style>