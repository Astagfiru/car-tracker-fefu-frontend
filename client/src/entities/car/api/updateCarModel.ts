import axios from "axios";
import { CARS_MODELS_PATH } from "../consts/baseUrl";
import type { CarModelsRequest, CarModelsResponse } from "../types/carTypes";

export const updateCarModel = async (
  id: number,
  payload: CarModelsRequest
): Promise<CarModelsResponse | null> => {
  try {
    const response = await axios.put<CarModelsResponse>(`${CARS_MODELS_PATH}/${id}`, payload);
    return response.data;
  } catch (error) {
    console.error("Ошибка обновления модели автомобиля:", error);
    return null;
  }
};
