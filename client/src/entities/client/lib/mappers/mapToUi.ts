import type { ClientsResponseBody } from "@/shared/api/openapi/client";
import type { ClientType } from "@/entities/client";

export const mapClientResponceBodyToClientUiType = (
  client: ClientsResponseBody
): ClientType => {
  return {
    id: Number(client.data.id),
    secondName: client.data.attributes.secondName,
    firstName: client.data.attributes.firstName,
    patronymic: client.data.attributes.patronymic,
    phoneNumber: client.data.attributes.phoneNumber,
    email: client.data.attributes.email,
    passportSeries: client.data.attributes.passportSeries,
    passportNumber: client.data.attributes.passportNumber,
    issuedBy: client.data.attributes.issuedBy,
    dateOfIssue: client.data.attributes.dateOfIssue,
  };
};


