import axios from "axios";
import { ClientType } from "../types/clientTypes";
import { CLIENTS_PATH } from "../consts/baseUrl";

export type NewClient = Omit<ClientType, "id">;

export const useDeleteClient = async (clientId: number): Promise<void> => {
  try {
    const path = `${CLIENTS_PATH}/${clientId}`;
    const response = await axios.delete(path);

    return response.data;
  } catch (error) {
    throw error;
  }
};
