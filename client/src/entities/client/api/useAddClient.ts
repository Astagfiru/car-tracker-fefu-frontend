import axios from "axios";
import { ClientType } from "../types/clientTypes";
import { CLIENTS_PATH } from "../consts/baseUrl";

export type NewClient = Omit<ClientType, "id">;

export const useAddClient = async (client: NewClient): Promise<void> => {
    try {
      const response = await axios.post(CLIENTS_PATH, client);
      return response.data
    } catch (error) {
      throw error
    }
  };
  
