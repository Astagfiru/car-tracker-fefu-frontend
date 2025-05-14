import { defineStore } from "pinia";
import { reactive, toRefs } from "vue";
import type { CarFormType, CarType } from "@/entities/car";

const CARS_STORE_NAME = "carsStore";

interface CarStore {
  cars: CarType[] | null;
  newCar: CarFormType | null;
  isLoading: boolean;
  errorMessage: string | null;
}

const carStoreInitialState: CarStore = {
  cars: null,
  newCar: null,
  isLoading: false,
  errorMessage: null,
};

export const useCarsStore = defineStore(CARS_STORE_NAME, () => {
  const state = reactive<CarStore>({
    ...carStoreInitialState,
  });

  const { cars } = toRefs(state);

  const saveAllCars = (newCars: CarType[]): void => {
    state.cars = newCars;
  };

  const addCar = (newCar: CarType) => {
    cars.value?.unshift(newCar);
  };

  return {
    ...toRefs(state),
    saveAllCars,
    addCar,
  };
});
