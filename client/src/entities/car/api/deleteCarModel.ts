import axios from "axios";
import { CARS_MODELS_PATH } from "../consts/baseUrl";

export const deleteCarModel = async (id: number): Promise<boolean> => {
  try {
    await axios.delete(`${CARS_MODELS_PATH}/${id}`);
    return true;
  } catch (error) {
    console.error("Ошибка удаления модели автомобиля:", error);
    return false;
  }
};
