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
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, watch } from "vue";
import { BaseTable } from "@/shared";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { TABLE_HEADERS, CarsTableView } from "../types/config";
import { useCarsStore } from "@/entities/car/lib/model/carStore";
import { useGetAllCars } from "@/entities/car/api/useGetAllCars";
import { TableToolbar } from "@/shared";
import { CarType } from '../../../entities/car/types/carTypes';

const router = useRouter();

const carsStore = useCarsStore();

const { cars } = storeToRefs(carsStore);
const { saveAllCars } = carsStore;

const redirect = () => {
  router.push({ name: "" });
};

const getAllClients = async () => {
  try {
    const fetchedCars = await useGetAllCars();

    if (fetchedCars) {
      saveAllCars(fetchedCars);
    }
  } catch (error) {
    throw error;
  }
};

watch(() => cars, getAllClients);

onMounted(() => {
  getAllClients();
});

const mapCarsToTableView = (car: CarType): CarsTableView => {
  return {
    model_id: car.model_id,
    avaliable: car.avaliable,
    mileage: car.mileage,
    price: car.price
  };
};

const mapClientsToTableView = (cars: CarType[]): CarsTableView[] => {
  return cars.map(mapCarsToTableView);
};

const mappedCars = computed((): CarsTableView[] | null => {
  if (!cars.value) {
    return null;
  }

  return mapClientsToTableView(cars.value);
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
