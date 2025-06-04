import axios from "axios";
import { ClientResponse, ClientRequest } from "../types/clientTypes";
import { CLIENTS_PATH } from "../consts/baseUrl";
import { AddClientResponce } from "../types/apiTypes";

export const addClient = async (requestBody : ClientRequest): Promise<AddClientResponce> => {
  try {
    const response = await axios.post(CLIENTS_PATH, requestBody);

    const { data } = response;
    console.log("Клиент создан", data)

    return data;
  } catch (error) {
    console.error("Ошибка создания нового клиента, подробнее:", error)
    return [];
  }
};