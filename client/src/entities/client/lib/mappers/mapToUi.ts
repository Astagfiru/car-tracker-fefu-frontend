import { ClientTypeResponse, ClientType } from "../../types/clientTypes";

export const mapClientApiResponseToClientUi = (client: ClientTypeResponse): ClientType => {
  return {
    id: Number(client.id),
    secondName: client.surname,
    firstName: client.name,
    patronymic: client.patronymic,
    phoneNumber: client.phone,
    email: client.email,
    passportSeries: client.passportSeries,
    passportNumber: client.passportNumber,
    issuedBy: client.passportIssuer,
    dateOfIssue: client.passportIssueDate,
  };
};

export const mapClientsApiResponseToUi = (clients: ClientTypeResponse[]): ClientType[] => {
  return clients.map(mapClientApiResponseToClientUi)
}