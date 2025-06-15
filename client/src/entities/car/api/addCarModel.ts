import axios from "axios";
import { CARS_MODELS_PATH } from "../consts/baseUrl";
import type { CarModelsRequest, CarModelsResponse } from "../types/carTypes";

export const addCarModel = async (payload: CarModelsRequest): Promise<CarModelsResponse | null> => {
  try {
    const response = await axios.post<CarModelsResponse>(CARS_MODELS_PATH, payload);
    return response.data;
  } catch (error) {
    console.error("Ошибка добавления модели автомобиля:", error);
    return null;
  }
};
