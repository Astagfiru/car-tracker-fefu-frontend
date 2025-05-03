import type { ClientsRequestBody } from "@/shared/api/openapi/client";
import type { ClientType } from "@/entities/client";

export const mapClientResponceBodyToClientUi = (
  client: ClientType
): ClientsRequestBody => {
  return {
    data: {
      type: "clients",
      attributes: {
        secondName: client.secondName,
        firstName: client.firstName,
        patronymic: client.patronymic,
        phoneNumber: client.passportNumber,
        email: client.email,
        passportSeries: client.passportSeries,
        passportNumber: client.passportNumber,
        issudeBy: client.issuedBy,
      },
    },
  };
};
