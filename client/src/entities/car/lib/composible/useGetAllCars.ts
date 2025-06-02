import { ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useFetch } from "@/shared";
import { getAllCars } from "../../api/getAllCars";
import { useGetAllCarModels } from "./useGetAllModelCars";
import { CarResponse, Car } from "../../types/carTypes";
import { mapCarsApiResponseToUi } from "../mappers";
import { useCarModelsStore } from "../model/carModelStore";
import { useCarsStore } from "../..";

export const useGetAllCars = () => {
  const { responseData, error, isLoading, sendRequest } = useFetch<CarResponse[]>(getAllCars);
  const mappedCars = ref<Car[]>([]);

  const carsStore = useCarsStore();
  const carModelsStore = useCarModelsStore();

  const { carModels } = storeToRefs(carModelsStore);

  const { saveAllCars } = carsStore;

  const { carModelsResponse } = useGetAllCarModels();

  watch(carModelsResponse, (newModels) => {
    if (newModels) {
      carModelsStore.saveAllCarModels(newModels);
    }
  });

  watch([responseData, carModels], ([cars, models]) => {
    if (cars && models) {
      const mapped = mapCarsApiResponseToUi(cars, models);

      mappedCars.value = mapped;

      saveAllCars(mapped);
    }
  });

  return {
    responseCars: mappedCars,
    error,
    isLoading,
    refetch: sendRequest
  };
};
