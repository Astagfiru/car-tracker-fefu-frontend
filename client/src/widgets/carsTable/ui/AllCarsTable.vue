<template>
  <div class="client-page">
    <div class="header">
      <TableToolbar
        add-button-title="Добавить позицию"
        :add-redirect="redirect"
      />
    </div>
    <BaseTable
      :key="mappedCars?.length"
      :tableHeader="TABLE_HEADERS"
      :tableItems="mappedCars"
      table-title="Автомобили"
      :is-loading="isLoading"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { BaseTable } from "@/shared";
import { useRouter } from "vue-router";
import { TABLE_HEADERS, CarsTableView } from "../config/config";
import { useGetAllCars } from "@/entities/car/lib/composible/useGetAllCars";
import { TableToolbar } from "@/shared";
import { Car } from '../../../entities/car/types/carTypes';

const router = useRouter();

const redirect = () => {
  router.push({ name: "" });
};

const { isLoading, responseCars} = useGetAllCars()

const mapCarsToTableView = (car: Car): CarsTableView => {
  return {
    model: car.model,
    inStock: car.inStock,
    mileage: car.mileage,
    price: car.price
  };
};

const mapClientsToTableView = (cars: Car[]): CarsTableView[] => {
  return cars.map(mapCarsToTableView);
};

const mappedCars = computed((): CarsTableView[] | null => {
  if (!responseCars.value) {
    return null;
  }

  return mapClientsToTableView(responseCars.value);
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