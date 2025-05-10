import axios from "axios";
import { ClientType, ClientTypeResponse } from "../types/clientTypes";
import { CLIENTS_PATH } from "../consts/baseUrl";
import { mapClientsApiResponseToUi } from "../lib/mappers/mapToUi";

export type NewClient = Omit<ClientType, "id">;

export const useGetAllClients = async (): Promise<ClientType[]> => {
  try {
    const response = await axios.get<ClientTypeResponse[]>(CLIENTS_PATH);
    
    const { data } = response;

    return mapClientsApiResponseToUi(data);
    
  } catch (error) {
    
    return []
  }
};