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

export type NewClient = Omit<ClientType, "id">;
