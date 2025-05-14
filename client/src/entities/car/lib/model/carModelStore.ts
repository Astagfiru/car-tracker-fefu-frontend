import { defineStore } from "pinia";
import { reactive, toRefs } from "vue";
import type { CarModelType, CarModelFormType } from "@/entities/car";

const CARS_MODEL_STORE_NAME = "carsStore";

interface CarModelsStore {
  carModels: CarModelType[] | null;
  newCarModel: CarModelFormType | null;
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

  const saveAllCarModels = (newCarModels: CarModelType[]): void => {
    carModels.value = newCarModels;
  };

  const addCarModel = (newCarModel: CarModelType) => {
    carModels.value?.unshift(newCarModel);
  };

  return {
    ...toRefs(state),
    saveAllCarModels,
    addCarModel,
  };
});
