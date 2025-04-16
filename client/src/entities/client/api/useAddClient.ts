import axios from "axios";
import { ClientType } from "../types/clientTypes";
import { CLIENT_PATH } from "../consts/baseUrl";

export type NewClientType = Omit<ClientType, "id">;

export const createClient = async (client: NewClientType): Promise<void> => {
    try {
      const response = await axios.post(CLIENT_PATH, client);
      console.log('Клиент создан', response.data);
    } catch (error) {
      console.error('Ошибка при создании клиента', error);
    }
  };
  
