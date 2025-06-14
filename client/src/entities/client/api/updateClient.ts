import axios from "axios";
import { ClientResponse, ClientRequest, Client } from "../types/clientTypes";
import { CLIENTS_PATH } from "../consts/baseUrl";
import { UpdateClientResponse } from "../types/apiTypes";

export const updateClient = async (updatedClient : ClientResponse): Promise<UpdateClientResponse> => {
  try {
     const url = `${CLIENTS_PATH}/${updatedClient.id}`;

    console.log("Обновление клиента с данными:", updatedClient);
    const response = await axios.put(url, updatedClient);

    const { data } = response;
    console.log("Клиент обновлен", data)

    return data;
  } catch (error) {
    console.error("Ошибка обновления клиента, подробнее:", error)
    return [];
  }
};