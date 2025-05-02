import axios from "axios";
import { ClientType } from "../types/clientTypes";
import { CLIENT_PATH } from "../consts/baseUrl";

export type NewClient = Omit<ClientType, "id">;

export const createClient = async (client: NewClient): Promise<void> => {
    try {
      const response = await axios.post(CLIENT_PATH, client);
      return response.data
    } catch (error) {
      throw error
    }
  };
  
