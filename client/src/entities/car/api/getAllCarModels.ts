import axios from "axios";
import { useFetch } from "@/shared/api/openapi/fetch/useOpenapiFetch";
import type { CarModelsResponse } from "../types/carTypes";
import { CARS_MODELS_PATH } from "../consts/baseUrl";

export const getAllCarModels = async (): Promise<CarModelsResponse[]> => {
  try {
    const response = await axios.get(CARS_MODELS_PATH);
    // Было: return response.data;
    return response.data.data; // <-- исправлено!
  } catch (error) {
    console.error("Ошибка получения всех типов автомобилей, подробнее:", error)
    return [];
  }
};