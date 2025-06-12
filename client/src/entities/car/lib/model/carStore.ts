import { defineStore } from "pinia";
import { reactive, toRefs } from "vue";
import type { CarForm, Car } from "@/entities/car";
import axios from "axios";

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
    console.log('Cars saved to store:', newCars.length); // Отладка
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

export const useGetAllCars = () => {
  const carStore = useCarsStore();

  const refetchCars = async (): Promise<Car[]> => {
    try {
      console.log('Starting to fetch cars...'); // Отладка
      carStore.isLoading = true;
      carStore.errorMessage = null;
      
      const response = await axios.get("/api/cars");
      console.log('API response:', response.data); // Отладка
      
      // Извлекаем массив из поля data
      const carsArray = response.data.data || response.data;
      console.log('Cars array:', carsArray); // Отладка
      
      carStore.saveAllCars(carsArray);
      return carsArray;
    } catch (error: any) {
      console.error("Ошибка при получении автомобилей:", error);
      carStore.errorMessage = error.message || "Не удалось загрузить автомобили";
      return [];
    } finally {
      carStore.isLoading = false;
    }
  };

  return {
    refetchCars,
  };
};