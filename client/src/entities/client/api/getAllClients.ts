import axios from "axios";
import { Client, ClientResponse } from "../types/clientTypes";
import { CLIENTS_PATH } from "../consts/baseUrl";
import { useClientStore } from "../lib/model/clientStore";

export const getAllClients = async (): Promise<ClientResponse[]> => {
  try {

        console.trace("getAllClients вызван"); // Покажет стек вызова

    const response = await axios.get<ClientResponse[]>(CLIENTS_PATH);
    const store = useClientStore();
    const { data } = response;
    console.log("Клиенты", data)

    return data;
  } catch (error) {
    console.error("Ошибка получения всех клиентов, подробнее:", error)
    return [];
  }
};
