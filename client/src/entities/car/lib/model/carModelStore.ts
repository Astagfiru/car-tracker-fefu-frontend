import { reactive, toRefs } from "vue";
import { defineStore } from "pinia";
import type { CarModel, CarModelForm } from "@/entities/car";

const CARS_MODEL_STORE_NAME = "carsStore";

interface CarModelsStore {
  carModels: CarModel[] | null;
  newCarModel: CarModelForm | null;
  isLoading: boolean;
  errorMessage: string | null;
}

const carModelsStoreInitialState: CarModelsStore = {
  carModels: null,
  newCarModel: null,
  isLoading: false,
  errorMessage: null,
};

export const useCarModelsStore = defineStore(CARS_MODEL_STORE_NAME, () => {
  const state = reactive<CarModelsStore>({
    ...carModelsStoreInitialState,
  });

  const { carModels } = toRefs(state);

  const saveAllCarModels = (newCarModels: CarModel[]): void => {
    carModels.value = newCarModels;
  };

  const addCarModel = (newCarModel: CarModel) => {
    carModels.value?.unshift(newCarModel);
  };

  return {
    ...toRefs(state),
    saveAllCarModels,
    addCarModel,
  };
});
