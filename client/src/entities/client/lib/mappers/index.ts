import {
  ClientResponse,
  Client,
  ClientRequest,
  ClientForm,
} from "../../types/clientTypes";

export const mapClientResponceToApi = (client: ClientResponse): Client => {
  return {
    id: client.id,
    secondName: client.last_name,
    firstName: client.first_name,
    patronymic: client.middle_name,
    phoneNumber: client.phone,
    email: client.email,
    passportSeries: client.passport_series,
    passportNumber: client.passport_number,
    issuedBy: client.issue_by,
    dateOfIssue: client.issue_date,
  };
};

export const mapClientsResponceToApi = (client: ClientResponse[]): Client[] => {
  return client.map(mapClientResponceToApi);
};
