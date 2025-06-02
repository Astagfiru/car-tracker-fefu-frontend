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
      :is-loading="isLoading"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { BaseTable, TableToolbar } from "@/shared";
import { TABLE_HEADERS } from "../config/config";
import { CarModelsTableView } from "../config/types";
import { useGetAllCarModels } from "@/entities/car/lib/composible/useGetAllModelCars";
import { CarModel } from "@/entities/car";

const router = useRouter();

const redirect = () => {
  router.push({ name: "" });
};

const { carModelsResponse, isLoading } = useGetAllCarModels();

const mapCarsToTableView = (carModel: CarModel): CarModelsTableView => ({
    model: carModel.model,
    additionalInfo: carModel.additionalInfo,
    brand: carModel.brand,
    fuelConsumption: carModel.fuelConsumption,
    year: carModel.year
});

const mapCarModelsToTableView = (carModels: CarModel[]): CarModelsTableView[] => {
  return carModels.map(mapCarsToTableView);
};

const mappedCarModels = computed((): CarModelsTableView[] | null => {
  if (!carModelsResponse.value) return null;
  return mapCarModelsToTableView(carModelsResponse.value);
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