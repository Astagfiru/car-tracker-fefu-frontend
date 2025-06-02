import { Car } from "@/entities/car";

export type CarsTableView = Omit<Car, "id" | "vin">
