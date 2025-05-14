import { CarModelType } from "@/entities/car";

export type CarModelsTableView = Omit<CarModelType, "id" | "addiitonalInfo" | "seats" | "doors">