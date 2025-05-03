import { watch } from "vue";
import { getAllClients } from "@/shared/api/openapi/client";
import type { ClientsListResponseBody, GetAllClientsErrors, GetAllClientsData, GetAllClientsResponse } from "@/shared/api/openapi/client";
import { ApiServiceReturn } from "@/shared/api/openapi/types";
import { useFetch } from "@/shared/api/openapi/fetch/useFetch";
import { mapClientsListApiResponseToClientUiList } from "../lib/mappers/mapToUi";
import { useClientStore } from "../model/clientStore";

interface GetAllClients {}

interface FetchAllClients extends ApiServiceReturn<GetAllClientsResponse, GetAllClientsErrors>  {
  getAllClients : (params: GetAllClientsData) => Promise<void>
}

export const fetchAllClients = (): FetchAllClients => {

  const mapParamsToRequestBody = (params: GetAllClientsData): GetAllClientsData => {
    return params
  }

  const { sendRequest, clearError, data, error, status, isLoading } = useFetch<GetAllClients, GetAllClientsData, ClientsListResponseBody, GetAllClientsErrors>(getAllClients, mapParamsToRequestBody)

  const clientsStore = useClientStore()

  const saveClients = () => {
    if (!data.value) {
      return
    }

    const allClients = mapClientsListApiResponseToClientUiList(data.value)
    clientsStore.saveAllClients(allClients)

  }

  watch(data, saveClients)

  return { getAllClients : sendRequest, clearError, data, error, status, isLoading }

}