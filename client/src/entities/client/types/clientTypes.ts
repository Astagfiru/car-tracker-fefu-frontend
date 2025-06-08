export interface Client {
  id: number;
  secondName: string;
  firstName: string;
  patronymic: string;
  phoneNumber: string;
  email: string;
  passportSeries: string;
  passportNumber: string;
  issuedBy: string;
  dateOfIssue: string;
}

export interface ClientResponse {
  id: number;
  last_name: string;
  first_name: string;
  middle_name: string;
  phone: string;
  email: string;
  passport_series: string;
  passport_number: string;
 issued_by: string;
  issue_date: string;
}

export type ClientRequest = Omit<ClientResponse, 'id'>

export type ClientForm = Omit<Client, "id">;
