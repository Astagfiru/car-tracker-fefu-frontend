import type {
  Client,
  ClientRequest,
  ClientResponse,
  ClientForm,
} from "./types/clientTypes";
import { useClientStore } from "./lib/model/clientStore";
import { getAllClients } from "./api/getAllClients";
import { useGetAllClients } from "./lib/composible/useGetAllClients";
import { useUpdateClient } from "./lib/composible/useUpdateClient";
import UserTable from "./ui/UserTable.vue";

export { useClientStore, useGetAllClients, useUpdateClient };
export type { Client, ClientRequest, ClientResponse, ClientForm };
export { UserTable }
