import type { Client } from "@/entities/client";

export type ClientTableView = Omit<Client, "id" | "passportSeries" | "passportNumber" | "issuedBy" | "dateOfIssue">
