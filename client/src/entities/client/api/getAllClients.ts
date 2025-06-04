import axios from "axios";
import { Client, ClientResponse } from "../types/clientTypes";
import { CLIENTS_PATH } from "../consts/baseUrl";

export const getAllClients = async (): Promise<ClientResponse[]> => {
  try {
    const response = await axios.get<ClientResponse[]>(CLIENTS_PATH);

    const { data } = response;
    console.log("Клиенты", data)

    return data;
  } catch (error) {
    console.error("Ошибка получения всех клиентов, подробнее:", error)
    return [];
  }
};
