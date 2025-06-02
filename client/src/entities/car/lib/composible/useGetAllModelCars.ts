import { ref, watchEffect } from "vue";
import { useFetch } from "@/shared";
import { getAllCarModels } from "../../api/getAllCarModels";
import { CarModelsResponse, CarModel } from "../../types/carTypes";
import { mapCarModelsResponceToApi } from "../mappers";
import { useCarModelsStore } from "../model/carModelStore";

export const useGetAllCarModels = () => {
  const { responseData, error, isLoading, sendRequest } = useFetch<CarModelsResponse[]>(getAllCarModels);

  const mappedCarModels = ref<CarModel[]>([]);

  const carModelsStore = useCarModelsStore()

  const { saveAllCarModels } = carModelsStore

  watchEffect(() => {
    if (responseData.value) {
      mappedCarModels.value = mapCarModelsResponceToApi(responseData.value);

      saveAllCarModels(mappedCarModels.value)
    }
  });

  sendRequest();

  return {
    carModelsResponse: mappedCarModels,
    error,
    isLoading,
    refetch: () => sendRequest(undefined),
  };
};
