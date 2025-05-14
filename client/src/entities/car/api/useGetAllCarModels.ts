import axios from "axios";
import type { CarModelType, CarModelResponse } from "../types/carTypes";
import { CARS_MODELS_TYPE_PATH } from "../consts/baseUrl";

export const useGetAllCarModels = async (): Promise<CarModelType[]> => {
  try {
    const response = await axios.get<CarModelResponse[]>(CARS_MODELS_TYPE_PATH);
    console.log(response)
    const { data } = response;

    return data;
  } catch (error) {
    return [];
  }
};
