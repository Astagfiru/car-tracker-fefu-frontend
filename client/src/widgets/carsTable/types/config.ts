import type { DataTableHeader } from "vuetify";

import { CarType } from "@/entities/car";

export type CarsTableView = Omit<CarType, "id" | "vin">

export const TABLE_HEADERS: DataTableHeader[] = [
  {
    title: "Название",
    key: "model_id",
    headerProps: {
      class: "table__title",
    },
  },
  {
    title: "Доступность",
    key: "avaliable",
    headerProps: {
      class: "table__title",
    },
  },
  {
    title: "Пробег",
    key: "mileage",
    headerProps: {
      class: "table__title",
    },
  },
  {
    title: "Цена",
    key: "price",
    headerProps: {
      class: "table__title",
    },
  },
];
