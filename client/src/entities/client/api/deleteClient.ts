import axios from "axios";
import { CLIENTS_PATH } from "../consts/baseUrl";
import { DeleteClientResponse } from "../types/apiTypes";
import { DeleteClientParams } from "../types/apiTypes";

export const deleteClient = async (clientId: DeleteClientParams): Promise<DeleteClientResponse> => {
  try {
    const url = `${CLIENTS_PATH}/${clientId}`;

    const response = await axios.delete(url);

    console.log(`Клиент с ID ${clientId} удален`);
    
    return response
  } catch (error) { 
    console.error("Ошибка создания нового клиента, подробнее:", error)
    return error;
  }
};
