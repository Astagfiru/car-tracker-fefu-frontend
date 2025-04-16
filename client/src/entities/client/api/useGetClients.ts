import axios from "axios";
import { ClientType } from "../types/clientTypes";
import { CLIENT_PATH } from "../consts/baseUrl";

export const fetchClients = async (): Promise<ClientType[]> => {
  try {
    const response = await axios.get<ClientType[]>(CLIENT_PATH);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении клиентов", error);
    return [];
  }
};
