import type { ClientType } from './types/clientTypes';
import type { NewClient } from './api/useAddClient';
import { useClientStore } from './lib/model/clientStore';
import { useAddClient } from './api/useAddClient';
import { useGetAllClients } from './api/useGetAllClients';
import { useDeleteClient } from './api/useDeleteClient';

export { ClientType, useClientStore, useAddClient, useGetAllClients, useDeleteClient, NewClient };
