import { CarType } from "@/entities/car";

export type CarsTableView = Omit<CarType, "id" | "vin">
