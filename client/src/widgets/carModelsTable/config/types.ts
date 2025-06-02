import { CarModel } from "@/entities/car";

export type CarModelsTableView = Omit<CarModel, "id" | "addiitonal_info" | "seats" | "doors">
