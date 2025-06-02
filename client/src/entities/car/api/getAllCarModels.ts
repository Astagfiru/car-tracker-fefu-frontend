import axios from "axios";
import { useFetch } from "@/shared/api/openapi/fetch/useOpenapiFetch";
import type { CarModelsResponse } from "../types/carTypes";
import { CARS_MODELS_PATH } from "../consts/baseUrl";

export const getAllCarModels = async (): Promise<CarModelsResponse[]> => {
  try {
    const response = await axios.get<CarModelsResponse[]>(CARS_MODELS_PATH);

    const { data } = response;

    return data;
  } catch (error) {
    console.error("Ошибка получения всех типов автомобилей, подробнее:", error)
    return [];
  }
};


