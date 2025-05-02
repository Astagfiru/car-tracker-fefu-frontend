import axios from "axios";
import { ClientType } from "../types/clientTypes";
import { CLIENT_PATH } from "../consts/baseUrl";

export const fetchClients = async (): Promise<ClientType[]> => {
  try {
    const response = await axios.get<ClientType[]>(CLIENT_PATH);
    return response.data;
  } catch (error) {
    throw error
  }
};
