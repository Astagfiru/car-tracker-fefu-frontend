<template>
  <div class="client-page">
    <div class="header">
      <TableToolbar
        add-button-title="Добавить модель"
        :add-redirect="redirect"
      />
    </div>
    <BaseTable
      :key="mappedCarModels?.length"
      :tableHeader="TABLE_HEADERS"
      :tableItems="mappedCarModels"
      table-title="Модели авто"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, watch } from "vue";
import { BaseTable } from "@/shared";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { CarModelsTableView } from "../types/types";
import { TABLE_HEADERS } from "../types/config";
import { useCarModelsStore } from "@/entities/car/lib/model/carModelStore";
import { useGetAllCarModels } from "@/entities/car/api/useGetAllCarModels";
import { TableToolbar } from "@/shared";
import { CarModelType } from "@/entities/car";

const router = useRouter();

const carsModelsStore = useCarModelsStore();

const { carModels } = storeToRefs(carsModelsStore);
const { saveAllCarModels } = carsModelsStore;

const redirect = () => {
  router.push({ name: "" });
};

const getAllCarModels = async () => {
  try {
    const fetchedCarModels = await useGetAllCarModels();

    if (fetchedCarModels) {
      saveAllCarModels(fetchedCarModels);
    }
  } catch (error) {
    throw error;
  }
};

watch(() => carModels, getAllCarModels);

onMounted(() => {
  getAllCarModels();
});

const mapCarsToTableView = (carModel: CarModelType): CarModelsTableView => {
  return {
    brand: carModel.brand,
    model: carModel.model,
    fuelConsumption: carModel.fuelConsumption,
    year: carModel.year
  };
};

const mapCarModelsToTableView = (carModels: CarModelType[]): CarModelsTableView[] => {
  return carModels.map(mapCarsToTableView);
};

const mappedCarModels = computed((): CarModelsTableView[] | null => {
  if (!carModels.value) {
    return null;
  }

  return mapCarModelsToTableView(carModels.value);
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
