import axios from "axios";
import { getAllClients } from "@/shared/api/openapi/client";
import type { ClientsResponseBody } from "@/shared/api/openapi/client";
import { ClientType } from "../types/clientTypes";
import { CLIENT_PATH } from "../consts/baseUrl";
import { mapClientResponceBodyToClientUi } from "../lib/mappers/mapToApi";

interface FetchAllClients {
  getClients : () => ClientType[]
}

export const fetchAllClients = () => {
  const getClients = (): ClientType[] => {
    const responce = getAllClients()

    mapClientResponceBodyToClientUi(responce.data)
  }
}