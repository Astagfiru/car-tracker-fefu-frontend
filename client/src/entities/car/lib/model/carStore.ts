import { defineStore } from "pinia";
import { reactive, toRefs } from "vue";
import type { CarForm, Car } from "@/entities/car";

const CARS_STORE_NAME = "carsStore";

interface CarStore {
  cars: Car[] | null;
  newCar: CarForm | null;
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

  const saveAllCars = (newCars: Car[]): void => {
    state.cars = newCars;
  };

  const addCar = (newCar: Car) => {
    cars.value?.unshift(newCar);
  };

  return {
    ...toRefs(state),
    saveAllCars,
    addCar,
  };
});
