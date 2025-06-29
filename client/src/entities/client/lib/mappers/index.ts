import {
  ClientResponse,
  Client,
  ClientRequest,
  ClientForm,
} from "../../types/clientTypes";

export const mapClientResponceToUi = (client: ClientResponse): Client => {
  return {
    id: client.id,
    secondName: client.last_name,
    firstName: client.first_name,
    patronymic: client.middle_name,
    phoneNumber: client.phone,
    email: client.email,
    passportSeries: client.passport_series,
    passportNumber: client.passport_number,
    issuedBy: client.issued_by,
    dateOfIssue: client.issue_date,
  };
};

export const mapClientUiToApi = (client: ClientForm): ClientRequest => {
  return {
    last_name: client.secondName,
    first_name: client.firstName,
    middle_name: client.patronymic,
    phone: formatingPhoneNumberToRequest(client.phoneNumber),
    email: client.email,
    passport_series: client.passportSeries,
    passport_number: client.passportNumber,
    issued_by: client.issuedBy,
    issue_date: client.dateOfIssue,
  };
};

export const mapClientsResponceToUi = (client: ClientResponse[]): Client[] => {
  return client.map(mapClientResponceToUi);
};

export const formatingPhoneNumberToRequest = (phone: string): string => {
  const cleanedPhone = phone.replace(/[^0-9+]/g, '');

  if (cleanedPhone.startsWith('+')) {
    return cleanedPhone;
  } else {
    return '8' + cleanedPhone;
  }
};