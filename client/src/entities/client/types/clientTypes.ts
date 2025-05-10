export interface ClientType {
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

export interface ClientTypeResponse {
  id: number;
  surname: string;
  name: string;
  patronymic: string;
  phone: string;
  email: string;
  passportSeries: string;
  passportNumber: string;
  passportIssuer: string;
  passportIssueDate:string;
}

export type NewClient = Omit<ClientType, "id">;
