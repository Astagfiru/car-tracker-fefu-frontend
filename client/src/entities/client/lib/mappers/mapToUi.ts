import type {
  ClientsListResponseBody,
  Clients,
} from "@/shared/api/openapi/client";
import type { ClientType } from "@/entities/client";

export const mapClientApiResponseToClientUi = (client: Clients): ClientType => {
  return {
    id: Number(client.id),
    secondName: client.attributes.secondName,
    firstName: client.attributes.firstName,
    patronymic: client.attributes.patronymic,
    phoneNumber: client.attributes.phoneNumber,
    email: client.attributes.email,
    passportSeries: client.attributes.passportSeries,
    passportNumber: client.attributes.passportNumber,
    issuedBy: client.attributes.issuedBy,
    dateOfIssue: client.attributes.dateOfIssue,
  };
};

export const mapClientsListApiResponseToClientUiList = (
  apiResponse: ClientsListResponseBody
): ClientType[] => {
  const mappedClients: ClientType[] = apiResponse.data.map(
    (client: Clients): ClientType => mapClientApiResponseToClientUi(client)
  );

  return mappedClients;
};