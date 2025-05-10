import type { ClientType } from "@/entities/client";

export type ClientTableView = Omit<ClientType, "id" | "passportSeries" | "passportNumber" | "issuedBy" | "dateOfIssue">
