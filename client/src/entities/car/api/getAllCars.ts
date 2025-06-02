import axios from "axios";
import type { CarResponse } from "../types/carTypes";
import { CARS_PATH } from "../consts/baseUrl";

export const getAllCars = async (): Promise<CarResponse[]> => {
  try {
    const response = await axios.get<CarResponse[]>(CARS_PATH);
    console.log(response)
    const { data } = response;

    return data;
  } catch (error) {
    console.error("Ошибка получения всех автомобилей, подробнее:", error)
    return [];
  }
}