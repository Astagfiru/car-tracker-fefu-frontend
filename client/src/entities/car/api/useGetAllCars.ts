import axios from "axios";
import type { CarType, CarTypeResponse } from "../types/carTypes";
import { CARS_PATH } from "../consts/baseUrl";

export const useGetAllCars = async (): Promise<CarType[]> => {
  try {
    const response = await axios.get<CarTypeResponse[]>(CARS_PATH);
    console.log(response)
    const { data } = response;

    return data;
  } catch (error) {
    return [];
  }
}